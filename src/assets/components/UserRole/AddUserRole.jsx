import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Switch,
  Typography,
} from "@material-tailwind/react";

export default function AddUserRole() {
  return (
    <Card className="h-full w-full">
      <CardBody>
        <div className="mb-8">
          <Typography variant="h5" color="blue-gray">
            Add User Role
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Fill in the details to add a new user role
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Role Name" />
          <div className="flex items-center">
            <Typography className="mr-4">Active:</Typography>
            <Switch color="blue" checked={true} />
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Cancel
        </Button>
        <Button color="lightBlue" size="sm">
          Add User Role
        </Button>
      </CardFooter>
    </Card>
  );
}
