var stations = [
  {id: "1000",
  short_name: "Liberty & Stanwix",
  lat: 40.441326,
  lng: -80.004679},

  {id: "1001",
  short_name: "Forbes Ave & Market Sq",
  lat: 40.440877,
  lng: -80.00308},

  {id: "1002",
  short_name: "Third & Wood",
  lat: 40.43903,
  lng: -80.00186},

  {id: "1003",
  short_name: "First Ave & Smithfield St",
  lat: 40.4372,
  lng: -80.000375},

  {id: "1004",
  short_name: "First Ave & B St",
  lat: 40.4358002,
  lng: -79.9968767},

  {id: "1005",
  short_name: "Forbes Ave & Grant St",
  lat: 40.4387769,
  lng: -79.9974405},

  {id: "1006",
  short_name: "Ross St & Sixth Ave",
  lat: 40.4400542,
  lng: -79.9951376},

  {id: "1007",
  short_name: "Stevenson St & Forbes Ave",
  lat: 40.437643,
  lng: -79.986695},

  {id: "1008",
  short_name: "Centre Ave and Consol",
  lat: 40.440368,
  lng: -79.988636},

  {id: "1009",
  short_name: "12th St & Penn Ave",
  lat: 40.445844,
  lng: -79.99238},

  {id: "1010",
  short_name: "10th St & Penn Ave",
  lat: 40.444614,
  lng: -79.9958114},

  {id: "1011",
  short_name: "Fort Duquesne Blvd & 7th",
  lat: 40.4448352,
  lng: -80.0007479},

  {id: "1012",
  short_name: "North Shore Trail & Ft Duquesne Bridge",
  lat: 40.445834,
  lng: -80.008882},

  {id: "1013",
  short_name: "Isabella St & Federal St",
  lat: 40.447571,
  lng: -80.003964},

  {id: "1014",
  short_name: "Ridge Ave & Brighton Rd (CCAC)",
  lat: 40.450595,
  lng: -80.013204},

  {id: "1015",
  short_name: "Federal St & E North Ave",
  lat: 40.45509087,
  lng: -80.0063467},

  {id: "1016",
  short_name: "17th St & Penn Ave",
  lat: 40.449631,
  lng: -79.985893},

  {id: "1017",
  short_name: "21st St & Penn Ave",
  lat: 40.452124,
  lng: -79.983543},

  {id: "1018",
  short_name: "37th St & Butler St",
  lat: 40.466103,
  lng: -79.964628},

  {id: "1019",
  short_name: "42nd St & Butler St",
  lat: 40.470188,
  lng: -79.9603066},

  {id: "1020",
  short_name: "42nd St & Penn Ave",
  lat: 40.465893,
  lng: -79.954417},

  {id: "1021",
  short_name: "Taylor St & Liberty Ave",
  lat: 40.462769,
  lng: -79.950867},

  {id: "1022",
  short_name: "Liberty Ave & S Millvale",
  lat: 40.4599487,
  lng: -79.9456124},

  {id: "1023",
  short_name: "Liberty Ave & Baum Blvd",
  lat: 40.456505,
  lng: -79.939362},

  {id: "1024",
  short_name: "S Negley Ave & Baum Blvd",
  lat: 40.458714,
  lng: -79.933483},

  {id: "1025",
  short_name: "Penn Ave & N Fairmount St",
  lat: 40.464443,
  lng: -79.933188},

  {id: "1026",
  short_name: "S Whitfield St & Baum Blvd",
  lat: 40.460982,
  lng: -79.926302},

  {id: "1027",
  short_name: "Shady Ave & Ellsworth Ave",
  lat: 40.458972,
  lng: -79.922023},

  {id: "1028",
  short_name: "Penn Ave & Putnam St (Bakery Sq)",
  lat: 40.455821,
  lng: -79.915248},

  {id: "1029",
  short_name: "Alder St & S Higland Ave",
  lat: 40.4573211,
  lng: -79.9248275},

  {id: "1030",
  short_name: "S Euclid Ave & Centre Ave",
  lat: 40.4589116,
  lng: -79.9290211},

  {id: "1031",
  short_name: "Maryland Ave & Ellsworth Ave",
  lat: 40.45628,
  lng: -79.930962},

  {id: "1032",
  short_name: "Maryland Ave & Walnut St",
  lat: 40.452621,
  lng: -79.928637},

  {id: "1033",
  short_name: "Ivy St & Walnut St",
  lat: 40.45177,
  lng: -79.932324},

  {id: "1034",
  short_name: "Ellsworth Ave & N Neville St",
  lat: 40.448419,
  lng: -79.947401},

  {id: "1035",
  short_name: "Fifth Ave & S Dithridge St",
  lat: 40.446744,
  lng: -79.950881},

  {id: "1036",
  short_name: "Schenley Dr at Schenley Plaza",
  lat: 40.442398,
  lng: -79.951479},

  {id: "1037",
  short_name: "Frew St & Schenley Dr",
  lat: 40.441032,
  lng: -79.948042},

  {id: "1038",
  short_name: "Boulevard of the Allies & Parkview Ave",
  lat: 40.434338,
  lng: -79.951877},

  {id: "1039",
  short_name: "Atwood St & Bates",
  lat: 40.437987,
  lng: -79.95367},

  {id: "1040",
  short_name: "Bigelow Blvd & Fifth Ave",
  lat: 40.4446284,
  lng: -79.9550156},

  {id: "1041",
  short_name: "Fifth Ave & S Bouquet",
  lat: 40.442325,
  lng: -79.957604},

  {id: "1042",
  short_name: "Centre Ave & Kirkpatrick St",
  lat: 40.445019,
  lng: -79.977194},

  {id: "1043",
  short_name: "Coltart Ave & Forbes Ave",
  lat: 40.438876,
  lng: -79.960179},

  {id: "1044",
  short_name: "Zulema St & Coltart Ave",
  lat: 40.435986,
  lng: -79.956942},

  {id: "1045",
  short_name: "S 27th & Tunnel Blvd",
  lat: 40.428658,
  lng: -79.965228},

  {id: "1046",
  short_name: "S 25th St & E Carson St",
  lat: 40.42802,
  lng: -79.969799},

  {id: "1047",
  short_name: "S 22nd St & E Carson St",
  lat: 40.428576,
  lng: -79.974559},

  {id: "1048",
  short_name: "S 18th St & Sidney St",
  lat: 40.429338,
  lng: -79.980684},

  {id: "1049",
  short_name: "S 12th St & E Carson St",
  lat: 40.4285528,
  lng: -79.9863687},

];
