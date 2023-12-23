import { useEffect, useState } from "react";
import { questionInputs } from "../../utils/constants";
import api from "../../services/apis/api";
import toast from "react-hot-toast";
import QuestionCard from "../../components/QuestionCard/QuestionCard";

const Questions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    api.questions.getAllQuestions()
      .then((res: any) => {
        console.log(res);
        setAllQuestions(res);
      })
      .catch((err: any) => console.log(err))
  }, [refetch]);

  const handleAddQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const options = [];
    for (let i = 1; i <= 4; i++) {
      options.push(formData.get(`option${i}`));
    }

    const question = {
      question: formData.get('question'),
      options,
      answer: formData.get('answer')
    }

    setIsLoading(true);
    api.questions.addQuestion(question)
      .then((res: any) => {
        console.log(res);
        if (res.success) {
          toast.success('Question added successfully');
          setRefetch(!refetch);
        } else {
          toast.error(res.error);
        }
        form.reset();
      })
      .catch((err: any) => {
        console.log(err)
        toast.error('Error adding question');
      })
      .finally(() => setIsLoading(false));

  }



  return (
    <div className="container mx-auto py-5">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-lg font-semibold mb-5">Add Questions</p>
        <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
          <form className="card-body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" onSubmit={handleAddQuestion}>
            {
              questionInputs.map((input, index) => (
                <div key={index} className="form-control">
                  <label className="label">
                    <span className="label-text">{input.label}</span>
                  </label>
                  <input type={input.type} placeholder={input.name} name={input.name} className="input input-bordered" required />
                </div>
              ))
            }

            <div className="form-control mt-9">
              <button className={`btn btn-primary ${isLoading ? 'loading loading-dots' : ''}`}>Add</button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-5 bg-slate-200 p-5 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          allQuestions.length > 0 ?
            allQuestions?.map((question: any, idx: number) => <QuestionCard key={question._id} idx={idx} item={question} setRefetch={setRefetch} />)
            :
            <p className=" text-xl font-semibold">No Questions</p>
        }
      </div>
    </div>
  );
};

export default Questions;