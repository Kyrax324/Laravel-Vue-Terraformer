export default {

	navbar_path: {
		'admin' : [
			{
				title : "General",
				routes : [
					{ 
						icon: "mdi-home", title : "Home", route: "/home/admin", module : "home", sub: null 
					},
				]
			},
			{
				title : "System Entities",
				routes : [
					{
						icon: "mdi-account-group", title : "User", route: null, module : "user", 
						sub: [
							{ title : "Users", route: "/user/list" },
						] 
					},
				]
			},
		],
		'role_2' : [
			{
				title : "General",
				routes : [
					{ icon: "mdi-home", title : "Home", route: "/home/role_2",module : "home", sub: null },
				]

			}
		]
	}

};
