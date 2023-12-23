import { useState } from "react";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";
import api from "../../services/apis/api";

interface QuestionCardProps {
  item: any,
  idx: number,
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>
}

const QuestionCard = ({ item, idx, setRefetch }: QuestionCardProps) => {
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { question, options, answer } = item;


  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
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
    api.questions.updateQuestion(item._id, question)
      .then((res: any) => {
        console.log(res);
        if (res.success) {
          console.log(res)
          toast.success('Question updated successfully');
          setIsEditing(false);
          setRefetch((prev) => !prev);
        } else {
          toast.error('Error updating question');
        }
        form.reset();
      })
      .catch((err: any) => {
        console.log(err)
        toast.error('Error updating question');
      })
      .finally(() => setIsLoading(false));
  }

  const handleDelete = () => {
    api.questions.deleteQuestion(item._id)
      .then((res: any) => {
        console.log(res);
        if (res.success) {
          toast.success('Question deleted successfully');
          setRefetch((prev) => !prev);
        } else {
          toast.error('Error deleting question');
        }
      })
      .catch((err: any) => {
        console.log(err)
        toast.error('Error deleting question');
      })
  }

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const renderEditForm = () => {
    return (
      <form onSubmit={handleUpdate}>
        <div className="flex items-center gap-2">
          <p>Q{idx + 1}.</p>
          <input type="text" name="question" defaultValue={question} className="input focus:outline-none input-bordered input-sm w-full" required />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {
            options.map((option: any, idx: number) => (
              <div key={idx} className="flex items-center gap-1">
                <p>{idx + 1}. </p>
                <input type="text" name={`option${idx + 1}`} defaultValue={option} className="input focus:outline-none input-bordered input-xs" required />
              </div>
            ))
          }
        </div>
        <div className="flex items-center mt-2 gap-2">
          <p>Answer: </p>
          <input type="text" name="answer" defaultValue={answer} className="input focus:outline-none input-bordered input-sm" required />
        </div>
        <div className="form-control mt-3">
          <button className={`btn btn-sm btn-primary ${isLoading ? 'loading loading-dots' : ''}`}>Update</button>
        </div>
      </form>
    )
  }



  return (
    <div className="p-3 rounded-md bg-base-100">
      {
        isEditing ?
          renderEditForm()
          :
          <div>
            <div className="flex justify-between">
              <p>Q{idx + 1}. {question}</p>
              <div>

                <div onClick={handleEditClick} className="w-max"><CiEdit className="text-blue-700 cursor-pointer text-xl" /></div>
                <div onClick={handleDelete} className="w-max"><MdDeleteSweep className="text-blue-700 cursor-pointer text-2xl" /></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {
                options.map((option: any, idx: number) => (
                  <div key={idx} className="flex items-center">
                    <p>{idx + 1}. {option}</p>
                  </div>
                ))
              }
            </div>
            <p>Answer: {answer}</p>
          </div>
      }
    </div>
  );
};

export default QuestionCard;