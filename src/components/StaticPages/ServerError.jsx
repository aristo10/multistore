export default function ServerError() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center items-center h-screen">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-blue-600 lg:text-9xl">
            500
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Internal Server Error.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry something went wrong.
          </p>
        </div>
      </div>
    </section>
  );
}
