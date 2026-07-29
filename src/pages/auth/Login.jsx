import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";

function Login() {
  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <Card>
        <h2>Smart Apply</h2>

        <br />

        <Button text="Login" />

        <br />
        <br />

        <Loader />
      </Card>
    </div>
  );
}

export default Login;