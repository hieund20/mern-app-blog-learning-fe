import React, { useState } from "react";
import TrapFocus from "@mui/material/Unstable_TrapFocus";
import Box from "@mui/material/Box";
import addIcon from "../../../../../assets/icons/add.svg";
import { postNewTag } from "../../../../../store/actions/tagsAction";
import "./AddTagTrapFocus.scss";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import removeIcon from "../../../../../assets/icons/remove.svg";
import DeleteModal from "./SubComponents/DeleteModal";

const styled = {
  display: "inline-block",
  marginLeft: "10px",
  position: "relative",
};

const AddTagTrapFocus = (props) => {
  const { tagList } = props;

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [tagValue, setTagValue] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [tagId, setTagId] = useState("");

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
                bottom: 150,
                marginLeft: 2,
                textTransform: "none",
              }}
            >
              Add
            </Button>
            {/* List Tag Scroll Down */}
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                maxHeight: 150,
                minHeight: 100,
                overflow: "auto",
                bgcolor: "background.paper",
              }}
            >
              {tagList?.data?.responseData?.map((tag, idx) => (
                <ListItem
                  key={idx}
                  disableGutters
                  secondaryAction={
                    <IconButton
                      onClick={() => {
                        setTagId(tag._id);
                        setModalShow(true);
                      }}
                    >
                      <img src={removeIcon} alt="remove-icon" />
                    </IconButton>
                  }
                >
                  <ListItemText primary={`${tag?.name}`} />
                </ListItem>
              ))}
            </List>
            {modalShow && (
              <DeleteModal
                open={modalShow}
                onClose={setModalShow}
                tagId={tagId}
              />
            )}
          </Box>
        </TrapFocus>
      )}
    </div>
  );
};

export default AddTagTrapFocus;
