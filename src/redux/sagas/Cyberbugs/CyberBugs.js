import Header from '~/components/CyberBugs/Main/Header';
import Info from '~/components/CyberBugs/Main/Info';
import Content from '~/components/CyberBugs/Main/Content';
function CyberBugs() {
  return (
    <>
      <div className="main">
        <Header />
        <h3 className="mt-3 mb-4">Cyber Board</h3>
        <Info />
        <Content />
      </div>
    </>
  );
}

export default CyberBugs;
