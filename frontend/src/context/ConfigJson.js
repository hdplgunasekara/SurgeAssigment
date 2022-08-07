const requestConfigJson = {
	headers: {
		Authorization: `bearer ${localStorage.getItem("accesstoken")}` || "",
		"Content-type": "application/json",
	},
};

export default requestConfigJson;
