import { ModalClose, Sheet } from "@mui/joy";
import { Modal, Stack, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

const FilterModal = ({ title, maxPrice, minPrice, sortSelect, setModalOpen, modalOpen, setSortSelect, setMaxPrice, setMinPrice }) => {

  const [priceRangeValue, setPriceRangeValue] = useState([minPrice, maxPrice]);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeValue(newValue);
  };

  const [sort, setSort] = useState(sortSelect)

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const handleClear = () => {
    setSortSelect("")
    setMinPrice(0)
    setMaxPrice(5000)
    setModalOpen(false)
  }

  const handleSave = () => {
    setMinPrice(priceRangeValue[0])
    setMaxPrice(priceRangeValue[1])
    setSortSelect(sort)
    setModalOpen(false)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={modalOpen}
      onClose={handleModalClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        sx={{
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          outline: "none"
        }}
      >
        <ModalClose
          onClick={handleModalClose}
          variant="outlined"
          sx={{
            bgcolor: "background.surface",
          }}
        />
        <div className="relative flex flex-col w-[90vw] md:w-[75vw] lg:w-[60vw] md:px-16">
          {/* title */}
          <div className="w-full">
            <h1 className="text-center text-3xl font-semibold">More Filters</h1>
          </div>
          <div className="px-4 w-full flex flex-col gap-4 items-start">
            <h1 className="text-2xl font-bold my-4">Select Price Range</h1>
            <Slider
              getAriaLabel={() => "Price range"}
              value={priceRangeValue}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
            />
            <Stack direction="row" justifyContent="space-evenly" alignItems="center" className="gap-4">
              <TextField
                label="min"
                type="number"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ width: "90px" }}
                value={priceRangeValue[0]}
                onChange={(e) => {
                  setPriceRangeValue([Number(e.target.value), priceRangeValue[1]]);
                }}
              />
              <Typography>-</Typography>
              <TextField
                label="max"
                type="number"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ width: "90px" }}
                value={priceRangeValue[1]}
                onChange={(e) => {
                  setPriceRangeValue([priceRangeValue[0], Number(e.target.value)]);
                }}
              />
            </Stack>
          </div>
          <div className="px-4 w-full flex flex-col gap-4 items-start">
            <h1 className="font-bold text-2xl mt-6">Sort Products</h1>
            <div className="w-full">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={sort}
                  onChange={handleChange}
                  label="Sort"
                >
                  <MenuItem value={"New to Old"}>New to Old</MenuItem>
                  <MenuItem value={"Old to New"}>Old to New</MenuItem>
                  <MenuItem value={"Price Low to High"}>Price Low to High</MenuItem>
                  <MenuItem value={"Price High to Low"}>Price High to Low</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="w-full flex items-center gap-4">
            <div onClick={handleSave} className="w-fit flex items-center gap-2 hover:bg-blue-400/10 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 mt-4">
              <CheckIcon fontSize="medium" />
              <h1 className="font-semibold text-lg">Save</h1>
            </div>
            <div onClick={handleClear} className="w-fit flex items-center gap-2 hover:bg-red-500/10 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 mt-4">
              <ClearIcon fontSize="medium" />
              <h1 className="font-semibold text-lg">Clear Filters</h1>
            </div>
          </div>
        </div>
      </Sheet>
    </Modal>
  )
}

export default FilterModal