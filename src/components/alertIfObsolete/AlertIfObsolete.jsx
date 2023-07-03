import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import css from "./AlertIfObsolete.module.scss";
import { ObsoleteIcon } from "./ObsoleteIcon";

/* 
Alert if the browser is obsolete (based on the latest supported expression configured in babel),
And offer a direct link to update it base on which browser
*/

const AlertIfObsolete = () => {
	console.log("toto l'alert");
	const obsoleteBrowser = isBrowserObsolete();
	return <>{obsoleteBrowser ? <ObsoleteAlert browser={obsoleteBrowser} /> : null}</>;
};
export default AlertIfObsolete;

const ObsoleteAlert = ({ browser }) => {
	const [isOpen, setIsOpen] = useState(true);
	const toggleIsOpen = () => {
		setIsOpen(isOpen => !isOpen);
	};

	const getBrowerUdtateLink = browser => {
		return browserUpdateLinks[browser];
	};

	return (
		<>
			<AnimatePresence>
				{isOpen ? (
					<motion.div
						key="alertModal"
						className={css.alertModal}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { duration: 0.3 } }}
						exit={{ opacity: 0, transition: { duration: 0.3 } }}
					>
						<motion.div
							initial={{ scale: 0.2 }}
							animate={{ scale: 1, transition: { duration: 0.3 } }}
							exit={{ scale: 0, transition: { duration: 0.2, delay: 0.1 } }}
						>
							<ObsoleteIcon className={css.svg} />
							<h2>Your browser is Obsolete</h2>
							<p>
								A outdated browser is a security risk, and few new technologies will not work, like this
								app.
							</p>
							<a
								className={css.primary}
								href={getBrowerUdtateLink(browser)}
								target="_blank"
								rel="noreferrer"
							>
								Update browser
							</a>
							<button onClick={toggleIsOpen} className={css.secondary}>
								Test anyway
							</button>
						</motion.div>
					</motion.div>
				) : (
					<button onClick={toggleIsOpen} className={css.alertIcon}>
						!
					</button>
				)}
			</AnimatePresence>
		</>
	);
};

const browserUpdateLinks = {
	chrome: "https://www.google.com/chrome",
	edge: "https://www.microsoft.com/edge",
	edg: "https://www.microsoft.com/edge",
	version: "https://support.apple.com/HT204416", // Safari
	firefox: "https://www.mozilla.org/firefox/new",
	opr: "https://www.opera.com", // Opera
	trident: "https://www.microsoft.com/edge", // MS IE
};

// Array.at() seems to be the breaking point in js support to make the app working without adding more polyfill.
// Array.at() supported since :
const oldBrowserVersion = {
	chrome: 91,
	edge: 91,
	edg: 91,
	version: 15.3, // Safari
	firefox: 89,
	opr: 77, // Opera
	trident: 11, // MS IE
};

const isBrowserObsolete = () => {
	const agent = window.navigator.userAgent.toLowerCase();
	switch (true) {
		case agent.includes("edge"): // MS Edge
			return isObsolete(agent, "edge");
		case agent.includes("edg/"): // Edge ( chromium based)
			return isObsolete(agent, "edg");
		case agent.includes("opr"): // Opera
			return isObsolete(agent, "opr");
		case agent.includes("chrome"):
			return isObsolete(agent, "chrome");
		case agent.includes("trident"): // MS IE
			return isObsolete(agent, "trident");
		case agent.includes("firefox"):
			return isObsolete(agent, "firefox");
		case agent.includes("version"): // Safari
			return isObsolete(agent, "version");
		default:
			return false;
	}
};

const getBrowserVersion = (agent, browser) => {
	const browserRegexp = new RegExp(`${browser}/([0-9]+.[0-9])`, "i");
	return parseFloat(agent.match(browserRegexp)[1]);
};

const isObsolete = (agent, browser) => {
	return getBrowserVersion(agent, browser) <= oldBrowserVersion[browser] && browser;
};
