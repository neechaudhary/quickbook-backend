const mongoose = require("mongoose");
const cashflowSchema = mongoose.Schema({
  month: {
    type: String,
  },
  cash_balance: {
    opening_balance: {
      type: Number,
    }
  },
  revenues: {
    in_store_sales: {
      type: Number,
    },
    online_sales: {
      type: Number,
    },
    other_revenues: {
      type: Number,
    },
    total_revenues: {
      type: Number,
    }
  },
});
module.exports = mongoose.model("cashflow", cashflowSchema);
