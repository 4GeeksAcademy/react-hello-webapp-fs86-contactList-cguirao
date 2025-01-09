import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import injectContext from "./store/appContext";


import { ContactList } from "./views/contactList";
import { AddContact } from "./views/addContact";


const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					{/* <Navbar /> */}
					<Routes>
						{/* <Route path="/" element={<Home />} />
						<Route path="/demo" element={<ContactList />} />
						<Route path="/single/:theid" element={<Single />} /> */}
						{/* <Route path="/" element={<ContactList ContactList={ContactList} setContactList={setContactList}/>}/>  */}
						<Route path="/" element={<ContactList/>}/> 
						<Route path="/addContact" element={<AddContact/>}/> 
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					{/* <Footer /> */}
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
