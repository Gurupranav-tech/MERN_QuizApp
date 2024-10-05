import { FaArrowRight } from "react-icons/fa";
import Card, { CardBody, CardHeader } from "../components/Card";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CardsSection />
    </>
  );
}

function CardsSection() {
  const navigate = useNavigate();

  return (
    <section className="card">
      <Card animate>
        <CardHeader>Create Quiz</CardHeader>
        <CardBody>
          <div className="flex flex-col items-center gap-5">
            <p>Create a quiz and share it with anyone in the world!</p>
            <Button type="primary" onClick={() => navigate("/create-quiz")}>
              Create <FaArrowRight />
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card animate>
        <CardHeader>View Quiz Stat</CardHeader>
        <CardBody>
          <div className="flex flex-col items-center gap-5">
            <p>
              See the responses for all your quizzes you have hosted till now!
            </p>
            <Button type="primary" onClick={() => navigate("/profile/stat")}>
              Go to Stat <FaArrowRight />
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card animate>
        <CardHeader>Quiz Taken by You</CardHeader>
        <CardBody>
          <div className="flex flex-col items-center gap-5">
            <p>See all the quizzes taken by you till date!</p>
            <Button type="primary" onClick={() => navigate("/profile/history")}>
              History <FaArrowRight />
            </Button>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="w-full ">
      <h1 className="text-center text-[64px] text-text-color-darker font-bold">
        Quizzer
      </h1>
      <p className="text-center text-text-color text-xl">
        One place to host and take all your quizzes!
      </p>
      <div className="mt-4 flex flex-col sm:flex-row gap-5 items-center sm:justify-center">
        <input
          type="text"
          placeholder="Enter code"
          className="max-w-80 px-4 py-2 rounded-xl w-full outline-none drop-shadow-md"
        />
        <Button type="secondary" animated>
          Start <FaArrowRight />
        </Button>
      </div>
    </section>
  );
}
