const mongoose = require("mongoose");
const balanceSheetSchema = new mongoose.Schema({
	current_assets: {
		cash: {
			type: Number,
		},
		acnt_receivable: {
			type: Number,
		},
		inventory: {
			type: Number,
		},
		total_current_assets: {
			type: Number,
		},
	},
	fixed_assets: {
		plants_nd_machinery: {
			type: Number,
		},
		depreciation: {
			type: Number,
		},
		land: {
			type: Number,
		},
		intangible_assets: {
			type: Number,
		},
		total_fixed_assets: {
			type: Number,
		},
	},
	total_assets: {
		type: Number,
	},
	current_liabilities: {
		acnt_payable: {
			type: Number,
		},
		taxes_payable: {
			type: Number,
		},
		long_term_bond: {
			type: Number,
		},
		total_current_liabilities: {
			type: Number,
		},
	},
	shareholders_equity: {
		Common_stock: {
			type: Number,
		},
		Retained_earnings: {
			type: Number,
		},
		total_shareholders_equity: {
			type: Number,
		},
	},
	total_liabilities: {
		type: Number,
	},
});
module.exports = mongoose.model("BalanceSheet", balanceSheetSchema);
