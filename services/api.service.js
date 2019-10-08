"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
	settings: {
		port: process.env.PORT || 3000,
		cors: {
            // Configures the Access-Control-Allow-Origin CORS header.
            origin: "*",
            // Configures the Access-Control-Allow-Methods CORS header. 
            methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE","PATCH"],
            // Configures the Access-Control-Allow-Headers CORS header.
			allowedHeaders: [	
								'Access-Control-Allow-Headers',, "X-Requested-With",
								'Content-type, Accept, apiaccesstoken, email, Pragma,Content-Length,transformRequest',
							],
            // Configures the Access-Control-Expose-Headers CORS header.
			exposedHeaders: [
								'Access-Control-Allow-Headers',, "X-Requested-With",
								'Content-type, Accept, apiaccesstoken, email,Pragma,Content-Length,transformRequest'
							],
            // Configures the Access-Control-Allow-Credentials CORS header.
            credentials: false,
            // Configures the Access-Control-Max-Age CORS header.
            maxAge: 3600
        },
		routes: [{
			path: "/api",
			authorization: true,
			cors: {
                origin: "*",
				methods: ["GET", "OPTIONS", "POST"],
                credentials: true,
				exposedHeaders: [
								"Access-Control-Allow-Headers", "X-Requested-With",
								'Content-type, Accept, apiaccesstoken, email,Pragma,Content-Length,transformRequest'
							],
				allowedHeaders: [
					
					'Access-Control-Allow-Headers',, "X-Requested-With",
					'Content-type, Accept, apiaccesstoken, email, Pragma,Content-Length,transformRequest',
				]
            },

			// whitelist: [
			// 	// Access to any actions in all services under "/api" URL
			// 	"**"
			// ]
			aliases: {
				// Accounts
				"OPTION /account/create": "account.create",
				"POST /account/create": "account.create",
				"GET /account/list": "account.listAccount",
				"PUT /accounts/:accountId":"account.update",
				"DELETE /accounts/:accountId":"account.updateDeleteStatus",
				"GET /accounts/:accountId":"account.getAccounts",
				"POST /accounts/:accountId/blacklists":"account.saveBackListNo",
				"DELETE /accounts/:accountId/blacklists":"account.deleteBalckListNo",
				"GET /accounts/:accountId/blacklists":"account.getBalckListNo",
				"GET /accounts/:accountId/blacklistall":"",
				"DELETE /accounts/:accountId/whitelists":"",
				"GET /accounts/:accountId/whitelists":"",
				"GET /accounts/:accountId/whitelistall":"",
				"POST /accounts/:accountId/senderid":"",
				"DELETE /accounts/:accountId/senderid/:senderid":"account.deleteSenderId",
				"GET /accounts/:accountId/senderid":"account.getSenderId",
				"POST /accounts/:accountId/serviceid":"",
				"DELETE /accounts/:accountId/serviceid":"",
				"GET /accounts/:accountId/serviceid":"account.getServiceId",
				"POST /accounts/:accountId/template":"account.createTemplate",
				"PUT /accounts/:accountId/template/:title":"",
				"DELETE /accounts/:accountId/serviceid":"",
				"GET /accounts/:accountId/template":"account.getTemplate",
				"PUT /accounts/:accountId/credit":"account.tranferCredit",


				//Campaign
				"POST /campaigns":"campaign.create",
				"PUT /campaigns/:id":"campaign.update",
				"GET /campaigns":"campaign.list",
				"GET /campaigns/:id":"campaign.list",

				// // Users
				// "REST /users": "users",

				// // Current user
				// "GET /user": "users.me",
				// "PUT /user": "users.updateMyself",

				// // Articles
				// "GET /articles/feed": "articles.feed",
				// "REST /articles": "articles",
				// "GET /tags": "articles.tags",

				// // Comments
				// "GET /articles/:slug/comments": "articles.comments",
				// "POST /articles/:slug/comments": "articles.addComment",
				// "PUT /articles/:slug/comments/:commentID": "articles.updateComment",
				// "DELETE /articles/:slug/comments/:commentID": "articles.removeComment",

				// // Favorites
				// "POST /articles/:slug/favorite": "articles.favorite",
				// "DELETE /articles/:slug/favorite": "articles.unfavorite",

				// // Profile
				// "GET /profiles/:username": "users.profile",
				// "POST /profiles/:username/follow": "users.follow",
				// "DELETE /profiles/:username/follow": "users.unfollow",
			},
			// onBeforeCall(ctx, route, req, res, next) {
			// 	// Set request headers to context meta
			// 	// ctx.meta.userAgent = req.headers["user-agent"];
			// 	if (req.method === 'OPTIONS'){
			// 		res.send(200);
			// 	}
			// 	else{
			// 		return;
			// 	} 
				
			// },

			// onAfterCall(ctx, route, req, res, data) {
			// 	// Async function which return with Promise
			// 	// return doSomething(ctx, res, data);
			// }
			
		}],

		// Serve assets from "public" folder
		assets: {
			folder: "public"
		}
		// onError(req, res, err) {
		// 	// Return with the error as JSON object
		// 	res.setHeader("Content-type", "application/json; charset=utf-8");
		// 	res.writeHead(err.code || 500);

		// 	if (err.code == 422) {
		// 		let o = {};
		// 		err.data.forEach(e => {
		// 			let field = e.field.split(".").pop();
		// 			o[field] = e.message;
		// 		});

		// 		res.end(JSON.stringify({ errors: o }, null, 2));				
		// 	} else {
		// 		const errObj = _.pick(err, ["name", "message", "code", "type", "data"]);
		// 		res.end(JSON.stringify(errObj, null, 2));
		// 	}
		// 	this.logResponse(req, res, err? err.ctx : null);
		// }
		
	}
};
