import '../../assets/style.scss';

export const metadata = {
  title: "User Registration",
  description: "Login and registration page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
