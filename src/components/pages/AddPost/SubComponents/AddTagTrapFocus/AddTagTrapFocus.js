import React, { useState } from "react";
import TrapFocus from "@mui/material/Unstable_TrapFocus";
import Box from "@mui/material/Box";
import addIcon from "../../../../../assets/icons/add.svg";
import { postNewTag } from "../../../../../store/actions/tagsAction";
import "./AddTagTrapFocus.scss";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";

const styled = {
  display: "inline-block",
  marginLeft: "10px",
  position: "relative",
};

const AddTagTrapFocus = (props) => {
  const { refreshData } = props;

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [tagValue, setTagValue] = useState("");

  const handleAddNewTag = async () => {
    const newTag = {
      name: tagValue,
    };
    await dispatch(postNewTag(newTag));

    setTagValue("");
  };

  return (
    <div className="add-tag-trap">
      <div>
        <img src={addIcon} onClick={() => setOpen(!open)} alt="add-icon" />
      </div>
      {open && (
        <TrapFocus open>
          <Box tabIndex={-1} sx={styled}>
            <label className="input-text">
              <TextField
                id="standard-basic"
                label="Add tags"
                variant="standard"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
              />
            </label>
            <Button
              variant="contained"
              onClick={() => handleAddNewTag()}
              sx={{
                position: "absolute",
                bottom: 0,
                marginLeft: 2,
                textTransform: "none",
              }}
            >
              Add
            </Button>
          </Box>
        </TrapFocus>
      )}
    </div>
  );
};

export default AddTagTrapFocus;
