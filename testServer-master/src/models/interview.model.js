const { Schema, model, Types } = require('mongoose');
const { interviewStatuses } = require('../constants/interview');

const itemSchema = new Schema({

  candidate: { $type: Types.ObjectId, ref: 'Candidate' },

  hr: String,
  techDev: String,
  team: String,
  position: String,
  source: String,


  updatedBy: [String],
  updateLog: {
    team: [],
    position: [],
    source: [],
    hhcv: [],
    interviewDate: [],
    questionnaire: {
      english: [],
      labor: [],
      loyalty: [],
      tech: [],
    },
    status: [],
    dates: {
      interview: [],
      answer: [],
      intern_start: [],
      dev_start: [],
    },
  },
  hhcv: Boolean,
  interviewDate: Date,
  questionnaire: {
    english: {
      $type: Number,
      default: 0,
      min: 0,
      max: 6,
    },
    labor: {
      $type: Number,
      default: 0,
      min: 0,
      max: 6,
    },
    loyalty: {
      $type: Number,
      default: 0,
      min: 0,
      max: 6,
    },
    tech: {
      $type: Number,
      default: 0,
      min: 0,
      max: 6,
    },
  },

  solution: Boolean,
  comments: {
    $type: [{
      type: String,
      userId: String,
      from: String,
      message: String,
      created: {
        $type: Date,
        default: Date.now,
      },
    }],
    default: [],
  },

  status: {
    $type: String,
    enum: {
      values: interviewStatuses,
      message: 'Status  is not defined',
    },
    default: 'created',
  }, // create set of statues

  dates: {
    interview: Date,
    answer: Date,
    intern_start: Date,
    dev_start: Date,
  }, // interview answer intern_start dev_startt

  createdAt: {
    $type: Date,
  },
  updatedAt: {
    $type: Date,
  },
}, { timestamps: true, typeKey: '$type' });


itemSchema.statics.getInterviews = async function (query, params = {}) {
  const skip = parseInt(params.skip || 0, 10);
  const limit = parseInt(params.limit || 10, 10);
  const sortBy = params.sortBy || '-createdAt';

  const data = await this.find(query)
    .skip(skip)
    .limit(limit)
    .sort(sortBy)
    .populate('candidate')
    .lean();
  const count = await this.countDocuments(query);

  return {
    items: data, count, skip, limit, sortBy,
  };
};

module.exports = model('Interview', itemSchema);
