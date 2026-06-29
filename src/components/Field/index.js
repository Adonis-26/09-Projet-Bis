import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
  EMAIL: 3,
};

const Field = ({
  type = FIELD_TYPES.INPUT_TEXT,
  label,
  name,
  placeholder,
  error,
  value,
  onChange,
}) => {
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          minLength={2}
          pattern="^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$"
          required
          value={value}
          onChange={onChange}
          data-testid="field-testid"
        />
      );
      break;
    case FIELD_TYPES.EMAIL:
      component = (
        <input
          type="email"
          name={name}
          placeholder={placeholder}
          required
          pattern="^[a-z0-9-]+@[a-z0-9-]+\.[a-z]+$"
          value={value}
          onChange={onChange}
          data-testid="field-testid"
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          data-testid="field-testid"
        />
      );
      break;
    default:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          required
          minLength={2}
          pattern="^[a-zA-Z]+$"
          value={value}
          onChange={onChange}
          data-testid="field-testid"
        />
      );
  }
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
      {error && <span className="inputField__error">{error}</span>}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
  error: "",
  value: "",
  onChange: () => null,
};

export default Field;