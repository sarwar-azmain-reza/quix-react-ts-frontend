import Api from './defaultapi'


class Questions extends Api {
    constructor(_axios: any) {
        super(_axios)
    }

    addQuestion = (data: any) => this.post('/questions', data)

    getAllQuestions = () => this.get('/questions')

    updateQuestion = (id: string, data: any) => this.put(`/questions/${id}`, data)

    deleteQuestion = (id: string) => this.delete(`/questions/${id}`)

}

export default Questions