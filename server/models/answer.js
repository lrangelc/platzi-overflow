import mongoose, {Schema} from 'mongoose';

const {ObjectId} = Schema.Types;

const AnswerSchema = Schema({
    description: {type:String, required:true},
    createdAt: {type:Date,default:Date.now,required:true},
    user: { type: ObjectId, ref: 'User', required: true }
});

const Answer = mongoose.model('Answer',AnswerSchema);

export default Answer;