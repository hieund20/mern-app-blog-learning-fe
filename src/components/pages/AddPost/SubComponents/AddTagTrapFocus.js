import React, { useState } from "react";
import TrapFocus from "@mui/material/Unstable_TrapFocus";
import Box from "@mui/material/Box";
import { postNewTag } from "../../../../store/actions/tagsAction";

const AddTagTrapFocus = () => {
  const [open, setOpen] = useState(false);
  const [tagValue, setTagValue] = useState("");

  const handleAddNewTag = async () => {
    const newTag = {
      name: tagValue,
    };
    await postNewTag(newTag);
  };

  return (
    <div>
      <button type="button" onClick={() => setOpen(!open)}>
        Add tags
      </button>
      {open && (
        <TrapFocus open>
          <Box tabIndex={-1} sx={{ mt: 1, p: 1 }}>
            <label>
              <input
                type="text"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
              />
            </label>
            <button type="button" onClick={() => handleAddNewTag()}>
              Add
            </button>
          </Box>
        </TrapFocus>
      )}
    </div>
  );
};

export default AddTagTrapFocus;
