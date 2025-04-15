import jwt from "jsonwebtoken";

// Secret key for JWT token generation and verification
const JWT_SECRET = "your_secret_key";

// Function to generate JWT token
export function generateToken(user: { email: string; role: string }): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
}

// Function to verify JWT token from header
export function verifyToken(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error(`Token verification failed ${error}`);
  }
}
