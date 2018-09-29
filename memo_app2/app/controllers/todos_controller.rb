class TodosController < ApplicationController
  # def index
  #   @todo = Todo.new
  #   respond_to do |format|
  #     format.html
  #     format.json {render json: @todo}
  #     format.xml  {render xml: @todo}
  #   end
  # end

  def index
    @todo = Todo.new
    @todos = Todo.order('created_at ASC')
    respond_to do |format|
       format.html
       format.json {render json: @todo}
       format.xml  {render xml: @todo}
    end
  end

  def create
  @todo = Todo.new(todo_params)
   if @todo.save
    respond_to do |format|
      format.html { redirect_to :root }
      format.json { render json: @todo}
    end
  else
    render :index
  end
end
  #respond_to do を使用し、リクエストされたformatによって処理を分けるようにしている。今回はhtmlと非同期通信のためのjsonを扱うようにした。
  #フォーマットがjsonの時は、jsファイル側で作成したtodo(@todo)を使用するためにrenderメソッドをしようし、作成したtodoそjson形式で返すようにする。

  private
  def todo_params
    params.require(:todo).permit(:content)
  end
end
