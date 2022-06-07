export function middleware(req) {
  console.log("in API middlware");
  return NextResponse.next();
}
