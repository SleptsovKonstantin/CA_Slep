const { Schema, model, Types } = require('mongoose');

const itemSchema = new Schema({
  birthDate: {
    type: Date,
    default: null,
  },
  trainingDate: {
    type: Date,
    default: null,
  },
  internDate: {
    type: Date,
    default: null,
  },
  startWorkDate: {
    type: Date,
    default: null,
  },
  leftDate: {
    type: Date,
    default: null,
  },
  application: String,
  age: Number, // Should calculate automatically at create
  phone: String,
  email: String,
  address: String,
  gender: String,
  candidate: { type: Types.ObjectId, ref: 'Candidate' },
  deleted: {
    type: Boolean,
    default: false,
  },
  inPlan: {
    type: Boolean,
    default: false,
  },
  inLLC_RU: {
    type: Boolean,
    default: false,
  },
  isGood: {
    type: Boolean,
    default: false,
  },
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
  city: {
    type: String,
    trim: true,
  },
  status: String,
  position: String,
  old_position: String,
  team: String,
  workGroup: String,
  result: {
    type: Number,
    trim: true,
  },
  leftReason: {
    type: Number,
    trim: true,
  },
  leftSummary: {
    type: String,
    trim: true,
  },
  fio: {
    type: String,
    trim: true,
  },
  hasProject: Boolean,
  english: 0,
  tech: 0,
  labor: 0,
  loyal: 0,
  comment: [{}],
  updatedBy: [String],
  salary: {}, // period: {period1:0, period2:0, bonus: 0}
  updateLog: {
    salary: [],
    position: [],
    birthDate: [],
    age: [], // Should calculate automatically at create
    phone: [],
    email: [],
    address: [],
    educationDate: [],
    trainingDate: [],
    internDate: [],
    inPlan: [],
    inLLC_RU: [],
    startWorkDate: [],
    gender: [],
    vk: [],
    hh: [],
    city: [],
    status: [],
    result: [],
    leftReason: [],
    leftDate: [],
    leftSummary: [],
    fio: [],
    channel: [],
    english: [],
    tech: [],
    labor: [],
    loyal: [],
    comment: [],
    deleted: [],
    mainRecruiterName: [],
    mainRecruiterId: [],
  },
  createdAt: {
    type: Date,
  },
  mainRecruiterName: String,
  mainRecruiterId: String,
  createdById: String,
  createdBy: String,
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


itemSchema.statics.getEmployees = async function (query, params = {}) {
  const limit = parseInt(params.limit || 25, 10);
  const skip = parseInt((params.page || 0) * limit, 10);
  const sortBy = params.sortBy || '-createdAt';
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

itemSchema.statics.getEmployeesNoLean = async function (query, params = {}, withSalary) {
  const limit = parseInt(params.limit || 25, 10);
  const skip = parseInt((params.page || 0) * limit, 10);
  const sortBy = params.sortBy || '-createdAt';
  const select = withSalary ? '' : '-salary';
  const data = await this.find(query)
    .skip(skip)
    .limit(limit)
    .sort(sortBy)
    .select(select)
    .populate('applicationItem');
  const count = await this.countDocuments(query);

  return {
    items: data, count, skip, limit, sortBy,
  };
};


module.exports = model('Employee', itemSchema);
