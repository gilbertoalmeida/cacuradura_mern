import { useState, useEffect } from "react";

export const prettyDateNoHours = date => {
  let crudeDate;
  let finalDate;
  let crudeMonth;
  let finalMonth;
  crudeDate = new Date(date).getDate();
  if (crudeDate < 10) {
    finalDate = "0" + crudeDate;
  } else {
    finalDate = crudeDate;
  }

  crudeMonth = new Date(date).getMonth() + 1;
  if (crudeMonth < 10) {
    finalMonth = "0" + crudeMonth;
  } else {
    finalMonth = crudeMonth;
  }

  return finalDate + "." + finalMonth + "." + new Date(date).getFullYear();
};

export const prettyDateHours = date => {
  let crudeDate;
  let finalDate;
  let crudeMonth;
  let finalMonth;
  let crudeHour;
  let finalHour;
  let crudeMinute;
  let finalMinute;
  crudeDate = new Date(date).getDate();
  if (crudeDate < 10) {
    finalDate = "0" + crudeDate;
  } else {
    finalDate = crudeDate;
  }

  crudeMonth = new Date(date).getMonth() + 1;
  if (crudeMonth < 10) {
    finalMonth = "0" + crudeMonth;
  } else {
    finalMonth = crudeMonth;
  }

  crudeHour = new Date(date).getHours();
  if (crudeHour < 10) {
    finalHour = "0" + crudeHour;
  } else {
    finalHour = crudeHour;
  }

  crudeMinute = new Date(date).getMinutes() + 1;
  if (crudeMinute < 10) {
    finalMinute = "0" + crudeMinute;
  } else {
    finalMinute = crudeMinute;
  }

  return (
    finalDate +
    "." +
    finalMonth +
    "." +
    new Date(date).getFullYear() +
    " " +
    finalHour +
    ":" +
    finalMinute
  );
};

export const prettyDateElapsed = date => {
  let commentDate = new Date(date);
  let commentMiliseconds = commentDate.getTime();
  let nowMiliseconds = Date.now();
  let elapsedMiliseconds = nowMiliseconds - commentMiliseconds;
  let shownElapsedTime;

  if (elapsedMiliseconds < 3600000) {
    shownElapsedTime = Math.floor(elapsedMiliseconds / 6000);
    return `${shownElapsedTime} minutes`;
  } else if (elapsedMiliseconds < 86400000) {
    shownElapsedTime = Math.floor(elapsedMiliseconds / 3600000);
    return `${shownElapsedTime} hours`;
  } else if (elapsedMiliseconds < 604800000) {
    shownElapsedTime = Math.floor(elapsedMiliseconds / 86400000);
    return `${shownElapsedTime} days`;
  } else if (elapsedMiliseconds < 31536000000) {
    shownElapsedTime = Math.floor(elapsedMiliseconds / 604800000);
    return `${shownElapsedTime} weeks`;
  } else {
    shownElapsedTime = Math.floor(elapsedMiliseconds / 31536000000);
    return `${shownElapsedTime} years`;
  }

  /* 1s = 1000 
  1min = 60000
  1h = 3600000
  1day = 86400000
  7days = 604800000
  1year = 31536000000 */
};

export const resizeTitleTextarea = textarea => {
  if (textarea) {
    textarea.style.height = "1em";

    // Get the computed styles for the element
    var computed = window.getComputedStyle(textarea);

    // Calculate the height
    var height =
      parseInt(computed.getPropertyValue("border-top-width"), 10) +
      parseInt(computed.getPropertyValue("padding-top"), 10) +
      textarea.scrollHeight +
      parseInt(computed.getPropertyValue("padding-bottom"), 10) +
      parseInt(computed.getPropertyValue("border-bottom-width"), 10);

    textarea.style.height = height + "px";
  }
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export const addErrorSrc = ev => {
  ev.target.src = "/Assets/img_load_fail.png";
};
