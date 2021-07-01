import { useRouter } from "next/router";

export function LoadNewPageLink({ children, href, color }) {
  const router = useRouter();
  const style = {
    marginRight: 5,
    marginLeft: 5,
    color: router.pathname === href ? color : "blue",
  };

  // router.__sentry = true;
  const handleClick = (e) => {
    // throw new Error("I'm in the click handler for LoadNewPageLink");

    // console.log("I'm after the error somehow??");

    e.preventDefault();
    // debugger;
    // router.push(href);

    // const currentLocation = window.location.href;
    setTimeout(() => {
      // console.log(`I'm in the setTimeout handler, about to go to ${href}`);
      router.push(href);
    }, 10000);
  };

  return (
    // <a href={href} onClick={handleClick} style={style}>
    <a onClick={handleClick} style={style}>
      {children}
    </a>
  );
}
