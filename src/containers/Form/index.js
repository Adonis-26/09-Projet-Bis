import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;
const EMAIL_REGEX = /^[a-z0-9-]+@[a-z0-9-]+\.[a-z]+$/i;

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formKey, setFormKey] = useState(0);
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    if (!formData.nom?.trim()) {
      return { nom: "Entrez votre nom" };
    }
    if (!NAME_REGEX.test(formData.nom)) {
      return { nom: "Nom invalide (2 caractères minimum, lettres uniquement)" };
    }

    if (!formData.prenom?.trim()) {
      return { prenom: "Entrez votre prénom" };
    }
    if (!NAME_REGEX.test(formData.prenom)) {
      return { prenom: "Prénom invalide (2 caractères minimum, lettres uniquement)" };
    }

    if (!formData.email?.trim()) {
      return { email: "Entrez votre email" };
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      return { email: "Format d'email invalide" };
    }

    if (!formData.message?.trim()) {
      return { message: "Entrez votre message" };
    }

    return {};
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();

      const formData = { nom, prenom, email, message };

      const newErrors = validate(formData);
      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        return;
      }

      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
        setNom("");
        setPrenom("");
        setEmail("");
        setMessage("");
        setFormKey((prev) => prev + 1);
        setErrors({});
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError, nom, prenom, email, message]
  );

  return (
    <form onSubmit={sendContact} noValidate>
      <div className="row">
        <div className="col">
          <Field
            name="nom"
            placeholder="Entrez votre Nom"
            label="Nom"
            value={nom}
            onChange={(evt) => setNom(evt.target.value)}
            error={errors.nom}
          />
          <Field
            name="prenom"
            placeholder="Entrez votre Prenom"
            label="Prénom"
            value={prenom}
            onChange={(evt) => setPrenom(evt.target.value)}
            error={errors.prenom}
          />
          <Select
            key={formKey}
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            name="email"
            placeholder="Entrez votre Email"
            label="Email"
            type={FIELD_TYPES.EMAIL}
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            error={errors.email}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            name="message"
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={message}
            onChange={(evt) => setMessage(evt.target.value)}
            error={errors.message}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;