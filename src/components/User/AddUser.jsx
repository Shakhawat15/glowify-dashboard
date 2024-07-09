import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";

export default function AddUser() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="mx-auto max-w-4xl">
        <CardBody className="p-8">
          <Typography variant="h5" color="blue-gray" className="mb-8">
            Add User
          </Typography>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-1">
              <Select label="Role" required>
                <Option value="admin">Admin</Option>
                <Option value="user">User</Option>
                {/* Add more roles as needed */}
              </Select>
            </div>
            <div className="col-span-1">
              <Input label="First Name" type="text" required />
            </div>
            <div className="col-span-1">
              <Input label="Last Name" type="text" required />
            </div>
            <div className="col-span-1">
              <Input label="Email" type="email" required />
            </div>
            <div className="col-span-1">
              <Input label="Phone" type="tel" required />
            </div>
            <div className="col-span-1">
              <Input label="Password" type="password" required />
            </div>
            <div className="col-span-1">
              <Input
                label="Profile Photo"
                type="file"
                accept="image/*"
                required
              />
            </div>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth>
            Add User
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
