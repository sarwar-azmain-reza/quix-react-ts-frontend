import toast from "react-hot-toast";
import { Attempt } from "../../pages/Answers/Answers";
import { useEffect, useState } from "react";

interface AnsCardProps {
  item: any,
  idx: number,
  setRightAttempts: React.Dispatch<React.SetStateAction<Attempt[]>>,
}

const AnsCard = ({ item, idx, setRightAttempts }: AnsCardProps) => {
  const { question, options, answer } = item;
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  const handleCheckRightWrongAndSaveAttempts = (option: any) => {
    if (option === answer) {
      toast.success('Right Answer');
      setRightAttempts((prev: any) => [...prev, { answer: option }]);
    } else {
      toast.error('Wrong Answer');
    }
    setAttempts((prev: any) => [...prev, { answer: option }]);
    let obj = {
      _id: item._id,
      attempts: [...attempts, { answer: option }]
    }
    localStorage.setItem(item._id, JSON.stringify(obj));
  }

  useEffect(() => {
    let obj = localStorage.getItem(item._id);
    if (obj) {
      let objParsed = JSON.parse(obj);
      setAttempts(objParsed.attempts);
    }
  }, []);


  return (
    <div className="p-3 rounded-md bg-base-100 h-max">
      <div>
        <div className="flex justify-between">
          <p>Q{idx + 1}. {question}</p>

        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {
            options.map((opt: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2 w-full">
                <div className={`rounded-md border border-blue-500 w-full p-3 cursor-pointer select-none`} onClick={() => handleCheckRightWrongAndSaveAttempts(opt)}><p>{opt}</p></div>
              </div>
            ))
          }
        </div>
        {attempts.length > 0 && <div className="mt-2">
          <p>Attempts</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {
              attempts.map((opt: any, idx: number) => (
                <div key={idx} className="flex items-center gap-2 w-full">
                  <p>{idx + 1}.{opt.answer}</p>
                </div>
              ))
            }
          </div>
        </div>}
      </div>

    </div>
  );
};

export default AnsCard;