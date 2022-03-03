import { Chip, MenuItem, OutlinedInput, Select } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import "./TagChipsSelect.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TagChipsSelect = (props) => {
  const { tagList, control, name } = props;
  const [selected, setSelected] = useState([]);

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setSelected(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selected}
          onChange={(e) => {
            handleChange(e);
            onChange(e);
          }}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value, idx) => (
                <Chip key={idx} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tagList?.map((tag, idx) => (
            <MenuItem key={idx} value={tag?.name}>
              {tag?.name}
            </MenuItem>
          ))}
        </Select>
      )}
    />
  );
};

export default TagChipsSelect;
