"use strict";
const accountCtrl = require('./controllers/account.js');
const account_model = require('./model/accountModel.js');
const DbService = require("./mixins/accountDb.mixin");
module.exports = {
	name: "account",
	mixins: [DbService("account")],
	
	/**
	 * Service settings
	 */
	settings: account_model,

	/**
	 * Service dependencies
	 */
	dependencies: [],	

	/**
	 * Actions
	 */
	actions: {
/**
		 * Soft Delete Accounts
		 * 
		 * @actions
		 * 
		 * @param {String} accountID - Article ID
		 * @returns 
		 */	
		updateDeleteStatus:{
			params: {
				accountId: { type: "string" }
			},
			handler(ctx) {
				
				return this.Promise.resolve()
					// .then(accountId => this.findByAccountId(accountId))
					.then(() => {
						return ctx.call("account.update", { _id: ctx.params.accountId, status:1 }).then((result)=>{
							return this.transformResult(result);
						});
					});
			}
		},
		/**
		 * Soft listAccount
		 * 
		 * @actions
		 * 
		 * 
		 * @returns 
		 */	
		listAccount:{
			params: {
				limit: { type: "number", optional: true, convert: true },
				offset: { type: "number", optional: true, convert: true },
			},
			handler(ctx) {
				
				const limit = ctx.params.limit ? Number(ctx.params.limit): null;
				const offset = ctx.params.offset ? Number(ctx.params.offset): null;
				// var resp = {
				// 	"status": true,
				// 	"code": 0,
				// 	"message": message,
				// 	"data": data
				
				//   };
				return this.Promise.resolve()
					// .then(accountId => this.findByAccountId(accountId))
					.then(() => {
						if(ctx.params.limit){
							return ctx.call("account.find", {limit:limit,offset:offset}).then((result)=>{
								return this.transformResult(result);
							});
						}else{
							return ctx.call("account.list", {fields: ["_id","name"] }).then((result)=>{
								return this.transformResult(result);
							});	
						}
					});
			}
		},
		/**
		 * Soft getAccounts
		 * 
		 * @actions
		 * 
		 * @param {String} accountID - Article ID
		 * @returns 
		 */	
		getAccounts:{
			params: {
				accountId: { type: "string" }
			},
			handler(ctx) {
				return this.Promise.resolve()
					// .then(accountId => this.findByAccountId(accountId))
					.then(() => {
						return ctx.call("account.get", { id: ctx.params.accountId });
					});
			}
		},
		/**
		* List SenderIds
		 * 
		 * @actions
		 * 
		 * @param {String} accountID - Article ID
		 * @returns 
		 */	
		getSenderId:{
			params: {
				accountId: { type: "string" }
			},
			handler(ctx) {
				return this.Promise.resolve()
					// .then(accountId => this.findByAccountId(accountId))
					.then(() => {
						return ctx.call("account.find", {id: ctx.params.accountId , fields: ["sender_ids"]} ).then((result)=>{
							return this.transformResult(result);
						});
					});
			}
		},
		/**
		* List Service IDs
		 * 
		 * @actions
		 * 
		 * @param {String} accountID - Article ID
		 * @returns 
		 */	
		getServiceId:{
			params: {
				accountId: { type: "string" }
			},
			handler(ctx) {
				this.logger.info(ctx.params.accountId);
				return this.Promise.resolve()
					// .then(accountId => this.findByAccountId(accountId))
					.then(() => {
						// return ctx.call("account.list", {fields: ["_id","name"] });	
						return ctx.call("account.get", {id: ctx.params.accountId ,fields: ["viber_service_ids"]} ).then((result)=>{
							return this.transformResult(result);
						});
					});
			}
		},
		/**
		* Create Template 
		 * 
		 * @actions
		 * 
		 * @param {String} accountID - Article ID
		 * @returns 
		 */	
		createTemplate:{
			params: {
				accountId: { type: "string" },
				title: { type: "string" },
				content: { type: "string" }
			},
			handler(ctx) {
				return this.Promise.resolve()
					// .then(accountId => this.findByAccountId(accountId))
					.then(() => {
						return ctx.call("account.update", { _id: ctx.params.accountId, template:{"title":ctx.params.title,"content":ctx.params.content}}).then((result)=>{
							return this.transformResult(result);
						});
					});
			}
		},
/**
		* Get Template 
		 * 
		 * @actions
		 * 
		 * @param {String} accountID - Article ID
		 * @returns 
		 */	
		getTemplate:{
			params: {
				accountId: { type: "string" }
			},
			handler(ctx) {
				return this.Promise.resolve()
					// .then(accountId => this.findByAccountId(accountId))
					.then(() => {
						return ctx.call("account.get",{id: ctx.params.accountId , fields: ["template"]});
					});
			}
		},
/** 
		* Get Template 
		 * 
		 * @actions
		 * 
		 * @param {String} accountID - Article ID
		 * @returns 
		 */	
		tranferCredit:{
			params: {
				accountId: { type: "string" },
				creditedAcc: { type: "string" } ,
				creditChange:{type: "object" }
			},
			handler(ctx) {
				return this.Promise.resolve()
					// .then(accountId => this.findByAccountId(accountId))
					.then(() => {
						return accountCtrl.transferCredit(ctx,this).then(()=>{
							return this.transformResult({});
						});
					});
			}
		},
		/**
		* List Accounts
		 * 
		 * @actions
		 * 
		 * @param {String} accountID - Article ID
		 * @returns 
		 */	
		
		/**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		
		hello() {
			return "Hello Moleculer";
		},

		/**
		 * Welcome a username
		 *
		 * @param {String} name - User name
		 */
		welcome: {
			params: {
				name: "string"
			},
			handler(ctx) {
				return `Welcome, ${ctx.params.name}`;
			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {
		findByAccountId(account) {
			return this.adapter.findOne({ account });
		},
			/**
		 * Transform the result entities to follow the RealWorld API spec
		 * 
		 * @param {Context} ctx 
		 * @param {Array} entities 
		 * @param {Object} user - Logged in user
		 */
		
		transformResult(result) {
			
				return  this.Promise.resolve().then(()=>{
					return {
						"status": true,
						"code": 0,
						"message": "Sucess",
						"data": result
					}
				})
			
		},

		/**
		 * Transform a result entity to follow the RealWorld API spec 
		 * 
		 * @param {Context} ctx 
		 * @param {Object} entity 
		 * @param {Object} user - Logged in user
		 */
		transformEntity(ctx, entity, user) {
			if (!entity) return this.Promise.resolve();

			return this.Promise.resolve(entity);
		}
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {

	}
};