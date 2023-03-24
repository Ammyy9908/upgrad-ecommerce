import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import Navbar from "../components/Navbar";
import HorizontalStepper from "../components/Stepper";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function PlaceOrder() {
  const steps = ["Items", "Select Address", "Confirm Order"];
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const address = useSelector((state) => state.appReducer.addresses);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  console.log("Active Tab", activeStep);

  return (
    <div className="">
      <Navbar />
      <div className="page_body px-2 sm:px-6 md:px-16 lg:px-32 py-12 overflow-y-scroll">
        <HorizontalStepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          isStepSkipped={isStepSkipped}
          handleBack={handleBack}
          handleNext={handleNext}
        />

        {activeStep === 0 && (
          <div className="w-[95%] mx-auto grid grid-cols-2 lg:grid-cols-3 lg:gap-64 my-16">
            <div className="product-image w-[230px] h-[230px] md:w-[375px] md:h-[375px] bg-gray-300 col-span-1"></div>
            <div className="product-meta col-span-2">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl">Iphone 12</h2>
              </div>
              <p>Quantity:12</p>
              <div className="mb-3 flex items-center gap-3">
                <span>Category</span>
                <span>
                  <strong>Mobilees</strong>
                </span>
              </div>
              <p className="text-black/50 md:w-[375px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores, dolore soluta, ducimus doloribus repudiandae vel
                tempore assumenda aliquid quibusdam natus alias delectus
                laudantium molestias architecto minima officiis sapiente saepe
                itaque.
              </p>
              <div>
                <p className="text-red-700 text-2xl">₹ {123000}</p>
              </div>
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div className="mx-auto w-[65%] flex flex-col items-center gap-12 my-16">
            <div className="w-full">
              <label>Select Address</label>
              <Select options={address} className="w-full" />
            </div>
            <p>Or</p>
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-2xl">Add Address</h3>
            </div>

            <form className="flex flex-col items-start gap-3 w-[375px] lg:w-[575px]">
              <TextField
                id="outlined-basic"
                label="Name *"
                variant="outlined"
                fullWidth
                value={""}
                onChange={null}
              />
              <TextField
                id="outlined-basic"
                label="Contact Number *"
                variant="outlined"
                value={""}
                onChange={null}
                fullWidth
              />

              <TextField
                id="outlined-basic"
                label="Street *"
                variant="outlined"
                value={""}
                onChange={null}
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="City *"
                variant="outlined"
                value={""}
                onChange={null}
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="State *"
                variant="outlined"
                value={""}
                type="number"
                onChange={null}
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Landmark"
                variant="outlined"
                value={""}
                onChange={null}
                fullWidth
              />

              <TextField
                id="outlined-basic"
                label="Zip Code *"
                variant="outlined"
                value={""}
                onChange={null}
                multiline
                rows={4}
                fullWidth
              />

              <Button variant="contained" color="primary" fullWidth>
                Save Address
              </Button>
            </form>
          </div>
        )}

        {activeStep === 2 && (
          <div className="w-full grid md:grid-cols-4 lg:grid-cols-6  bg-white my-16 shadow-2xl">
            <div className="col-span-3 px-6 py-12">
              <h3 className="text-3xl">Shoes</h3>
              <p className="mt-3">Quantity</p>
              <p className="mt-3">
                Category <strong>Electoronics</strong>
              </p>
              <p className="mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium autem recusandae repellendus possimus facilis debitis
                quasi illo error doloremque magni, ad quas voluptatibus
                blanditiis necessitatibus sed eos et? Minus, saepe.
              </p>
              <h3 className="text-2xl text-red-700 mt-3">Total Price 12000</h3>
            </div>
            <div className="col-span-2 px-6 py-12 border-l">
              <h2 className="text-3xl">Address Details</h2>
              <p className="mt-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
                adipisci similique, unde mollitia quas nostrum eius provident,
                facilis nesciunt deserunt sed explicabo distinctio tempora sunt
                quos qui vel! Perferendis, aut!
              </p>
            </div>
          </div>
        )}
        <div className="fixed right-10 bottom-10">
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>

          <Button onClick={handleNext} variant="contained" color="primary">
            {activeStep === steps?.length - 1 ? "Place Order" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
