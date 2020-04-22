import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";

export const AnimatedRoutesWrapper = props => {
  const location = useLocation();
  console.log(location);

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        {props.children}
      </Switch>
    </AnimatePresence>
  );
};

export const RouteTransition = props => {
  const { children, path, exact } = props;
  console.log("route transition run");
  return (
    <Route path={path} exact={exact}>
      <MountTransition>{children}</MountTransition>
    </Route>
  );
};

export const MountTransition = props => {
  console.log("mount transition run");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  );
};
