export default function errorHandler(error) {
  switch (error) {
    case 200: 
      return 'BAD REQUEST';
    case 400: 
      return 'ERROR IN REQUEST';
    case 401: 
      return 'UNAUTHORIZED';
    case 404: 
      return 'NOT FOUND';
    case 500:
      return 'INTERNAL SERVER ERROR'
    default:
      return 'UNKNOWN ERROR';
  }
}