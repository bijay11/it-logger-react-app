import React, { useState, useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateLog } from "./../../actions/logActions";

const EditLogModal = ({ current, updateLog }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);
  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please enter a message and tech" });
    } else {
      const updLog = {
        id: current.id,
        message,
        attention,
        tech,
        date: new Date(),
      };
      updateLog(updLog);
      M.toast({ html: `Log updated by ${tech}` });
      //Clear fields
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="brower-default"
              onChange={(e) => setTech(e.target.value)}
            >
              <option value="" disabled>
                Select Technician
              </option>
              <option value="John Doe">John Doe</option>
              <option value="Sam Smith">Sam Smith</option>
              <option value="Sara Wilson">Sara Wilson</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p className="label">
              <label>
                <input
                  type="checkbox"
                  name="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}
                />
                <span>Need Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect blue waves-light btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "75%",
  height: "75%",
};
EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.log.current,
});
export default connect(mapStateToProps, { updateLog })(EditLogModal);
