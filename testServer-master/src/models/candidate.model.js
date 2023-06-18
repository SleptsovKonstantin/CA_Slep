const { Schema, model, Types } = require('mongoose');

const itemSchema = new Schema({
  birthDate: Date,
  age: Number, // Should calculate automatically at create
  phone: String,
  email: String,
  address: String,
  application: String,
  heared_about_company: String,
  employee: { type: Types.ObjectId, ref: 'Employee' },
  gender: String,
  isAI: Boolean, // is it auto imported
  vk: {
    type: String,
    trim: true,
    index: true,
  },
  hh: {
    type: String,
    trim: true,
    index: true,
  },
  worksheet: {
    type: String,
    trim: true,
    index: true,
  },
  city: {
    type: String,
    trim: true,
  },
  status: String,
  position: String,
  old_position: String,
  team: String,
  workGroup: String,
  noWriteAgain: Boolean,
  mayWriteAfter: {
    type: Date,
    default: null,
  },
  interviewDate: {
    type: Date,
    default: null,
  },
  lastContactDate: {
    type: Date,
    default: null,
  },
  resultDate: String,
  result: {
    type: Number,
    trim: true,
    default: 0,
  },
  leftReason: {
    type: Number,
    trim: true,
    default: 0,
  },
  fio: {
    type: String,
    trim: true,
  },
  channel: {
    type: Number,
    trim: true,
    default: 0,
  },
  english: 0,
  tech: 0,
  labor: 0,
  loyal: 0,
  comment: String,
  updatedBy: [String],
  createdById: String,
  createdBy: String,
  updateLog: {
    position: [],
    birthDate: [],
    age: [], // Should calculate automatically at create
    phone: [],
    email: [],
    address: [],
    gender: [],
    vk: [],
    hh: [],
    city: [],
    status: [],
    lastContactDate: [],
    interviewDate: [],
    noWriteAgain: [],
    mayWriteAfter: [],
    dates: {
      interview: [],
      result: [],
    },
    result: [],
    leftReason: [],
    fio: [],
    channel: [],
    english: [],
    tech: [],
    labor: [],
    loyal: [],
    comment: [],
    mainRecruiterName: [],
    mainRecruiterId: [],
  },
  createdAt: {
    type: Date,
  },
  mainRecruiterName: String,
  mainRecruiterId: String,
  updatedAt: {
    type: Date,
  },
}, { timestamps: true });


itemSchema.virtual('applicationItem', {
  ref: 'Application',
  localField: 'application',
  foreignField: '_id',
  justOne: true,
});

itemSchema.set('toObject', { virtuals: true });
itemSchema.set('toJSON', { virtuals: true });

itemSchema.pre('save', (next) => {
  if (this.application === '') {
    this.application = undefined;
  }
  next();
});

itemSchema.statics.getCandidates = async function (query, params = {}) {
  const limit = parseInt(params.limit || 25, 10);
  const skip = parseInt((params.page || 0) * limit, 10);
  const sortBy = params.sortBy || '-lastContactDate';

  const data = await this.find(query)
    .skip(skip)
    .limit(limit)
    .sort(sortBy)
    .populate('applicationItem')
    .lean();
  const count = await this.countDocuments(query);

  return {
    items: data, count, skip, limit, sortBy,
  };
};


module.exports = model('Candidate', itemSchema);
