class ConversationChannel < ApplicationCable::Channel
  def subscribed
    conversation = Channel.find(params[:id])
    stream_for conversation
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
