import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";

export default function AddBrand() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="mx-auto max-w-4xl">
        <CardBody className="p-8">
          <Typography variant="h5" color="blue-gray" className="mb-8">
            Add Brand
          </Typography>
          <form>
            <div className="mb-4">
              <Input label="Brand Name" type="text" required />
            </div>
            <div className="mb-8">
              <Input
                label="Brand Image"
                type="file"
                accept="image/*"
                required
              />
            </div>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth>
            Add Brand
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
