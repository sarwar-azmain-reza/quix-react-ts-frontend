import { useEffect, useState } from "react";
import api from "../../services/apis/api";
import AnsCard from "../../components/AnsCard/AnsCard";

export interface Attempt {
  answer: string,
}

const Answers = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [rightAttempts, setRightAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    api.questions.getAllQuestions()
      .then((res: any) => {
        setAllQuestions(res);
      })
      .catch((err: any) => console.log(err))
  }, []);

  useEffect(() => {
    let rightAnswers: Attempt[] = [...rightAttempts]
    rightAnswers = rightAnswers.filter((v, i, a) => a.findIndex(t => (JSON.stringify(t) === JSON.stringify(v))) === i)
    setScore(rightAnswers.length);
  }, [rightAttempts]);


  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mt-2">
        <p className="text-xl font-semibold">Score: {score}</p>
      </div>
      <div className="mt-5 bg-slate-200 p-5 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 container mx-auto">
        {
          allQuestions.length > 0 ?
            allQuestions?.map((question: any, idx: number) => <AnsCard key={question._id} idx={idx} item={question} setRightAttempts={setRightAttempts} />)
            : <p className=" text-xl font-semibold">No Questions</p>
        }
      </div>
    </div>
  );
};

export default Answers;