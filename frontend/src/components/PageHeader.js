function PageHeader({ title, description }) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export default PageHeader;
