import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="xl:flex bg-[#333] text-white xl:h-[80vh]">
      <Image
        className="h-[600px] xl:h-full w-full xl:w-[700px]"
        src="/images/bg.png"
        width="700"
        height="500"
        alt="wine"
      />
      <div className="sm:flex p-[7rem] gap-[3rem]">
        <h3 className="text-[2rem] font-bold max-w-[300px]">
          OH YES, WE DID.THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA.
        </h3>
        <div className="flex flex-col gap-[1.5rem]">
          <h4 className="text-yellow-400 text-[1.3rem] mt-[2rem] sm:mt-0">
            FIND OUR RESTAURANTS
          </h4>
          <div>
            <p>1654 R. Don Road #304.</p>
            <p>NewYork, 85022</p>
            <p>(602) 867-1010</p>
          </div>
          <div>
            <p>2356 K. Laquie Rd #235.</p>
            <p>NewYork, 85022</p>
            <p>(602) 867-1011</p>
          </div>
          <div>
            <p>1614 K. Erwin St #104.</p>
            <p>NewYork, 85022</p>
            <p>(602) 867-1012</p>
          </div>
          <div>
            <p>1614 W. Caroll St #125.</p>
            <p>NewYork, 85022</p>
            <p>(602) 867-1013</p>
          </div>
        </div>
        <div className="flex flex-col gap-[1.5rem]">
          <h4 className="text-yellow-400 text-[1.3rem] mt-[2rem] sm:mt-0">
            WORKING HOURS
          </h4>
          <div>
            <p>MONDAY UNTIL FRIDAY</p>
            <p>9:00 - 22:00</p>
          </div>
          <div>
            <p>SATURDAY - SUNDAY</p>
            <p>12:00 - 24:00</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
