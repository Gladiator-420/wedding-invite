/* ONE place to edit everything: names, date, venue, events, RSVP, text. */
window.WEDDING={
  a:"Krish", b:"Khushi",
  date:"2027-02-21T11:00:00+05:30",            /* main ceremony (Shubh Vivah) */
  invite:"With the blessings of the Almighty and our beloved elders, we joyfully invite you to bless the union of our children.",
  venue:{name:"Your Venue Name",city:"Your City",address:"Street address, City, State, PIN",mapQuery:"Your Venue Name, Your City"},
  families:[
    {title:"Groom’s family",head:"Krish, son of",parents:"Mr. Rajesh & Mrs. Sunita Sharma",others:"With grandparents, uncles, aunts and the entire Sharma family"},
    {title:"Bride’s family",head:"Khushi, daughter of",parents:"Mr. Anil & Mrs. Meena Verma",others:"With grandparents, uncles, aunts and the entire Verma family"}],
  events:[
    {icon:"🌼",name:"Haldi",date:"2027-02-19T10:00:00+05:30",time:"10:00 AM",place:"Family residence",dress:"Yellow or soft pastel ethnic wear",hours:3},
    {icon:"🪷",name:"Mehendi",date:"2027-02-19T17:00:00+05:30",time:"5:00 PM",place:"Family residence",dress:"Green or floral Indian wear",hours:4},
    {icon:"🎶",name:"Sangeet",date:"2027-02-20T19:30:00+05:30",time:"7:30 PM",place:"Banquet hall",dress:"Festive Indian glam",hours:4},
    {icon:"🔥",name:"Shubh Vivah",date:"2027-02-21T11:00:00+05:30",time:"11:00 AM",place:"Main mandap",dress:"Red, ivory or pastel traditional wear",hours:4,main:true},
    {icon:"🥂",name:"Reception",date:"2027-02-21T20:00:00+05:30",time:"8:00 PM",place:"Banquet hall",dress:"Formal Indian wear or evening gowns",hours:4}],
  muhurat:"11:23 AM (please confirm with your pandit)",
  dressCode:"Traditional Indian attire. Reds, golds and pastels are welcome. Please avoid all-black and all-white outfits.",
  notes:["Please arrive 20 minutes before the muhurat.","Lunch is served after the ceremony.","Please keep phones on silent during the pheras."],
  guest:["Rooms are held for out-of-town guests. Please tell us your travel dates in the RSVP message.","Parking is available at the venue; valet service is provided.","Your presence is the only gift we need."],
  etiquette:["Remove footwear before entering the mandap area.","Please do not step in front of the photographers during the rituals.","Join us for the blessings, the music and the dancing."],
  rsvp:{by:"2027-02-01",maxGuests:6,whatsapp:"",email:""},   /* whatsapp: country code + number, digits only */
  blessing:"May Lakshmi and Narayan bless this union with love, laughter and a lifetime of togetherness."
};