const dayjs = require('dayjs')

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: createdAtVal => dayjs(createdAtVal).format('MMMM DD, YYYY [at] h:m a')
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
    
)


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max: 280,

        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: createdAtVal => dayjs(createdAtVal).format('MMMM DD, YYYY [at] h:m a')
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);


thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;