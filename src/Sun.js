/**
 * Sunrise/Sunset times for an observer at a given latitude and
 * longitude.
 *
 * Extracted from original sources by Chris Cornwall, Aaron Horiuchi
 * and Chris Lehman of the Global Monitoring Laboratory (GML) of the
 * National Oceanic and Atmospheric Administration (NOAA)
 */
export default class Sun {

  /**
   * @param {number} lat latitude of observer, in degrees
   * @param {number} lon longitude of observer, in degrees
   */
  constructor(lat, lon) {

    /**
     * Latitude of observer in degrees
     * @member {number}
     */
    this.latitude = lat;

    /**
     * Longitude of observer in degrees
     * @member {number}
     */
    this.longitude = lon;
  }

  /**
   * Convert radian angle to degrees
   * @param {number} rad angle in radians
   * @return {number} the same angle in degrees
   * @private
   */
  static radToDeg(rad) {
	  return (180.0 * rad / Math.PI);
  }

  /**
   * Convert degree angle to radians
   * @param {number} deg angle in degrees
   * @return {number} the same angle in radians
   * @private
   */
  static degToRad(deg) {
	  return (Math.PI * deg / 180.0);
  }

  /**
   * Julian day from calendar date
   * @param {Date} date the calendar date
   * @return {number} The Julian day corresponding to the start of the date.
   * @private
   */
  static julianDayFromDate(date) {
    let year = date.getUTCFullYear();
    let month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
	  if (month <= 2) {
		  year -= 1;
		  month += 12;
	  }
	  const A = Math.floor(year / 100);
	  const B = 2 - A + Math.floor(A / 4);
    
	  const JD = Math.floor(365.25 * (year + 4716))
          + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
	  return JD;
  }

  /**
   * Convert Julian Day to centuries since J2000.0.	
   * @param {number} jd the Julian Day to convert
   * @return {number} the T value corresponding to the Julian Day
   * @private
   */
  static julianDay2JulianCentury(jd) {
	  const T = (jd - 2451545.0) / 36525.0;
	  return T;
  }

  /**
   * Convert centuries since J2000.0 to Julian Day.	
   * @param {number} t number of Julian centuries since J2000.0
   * @return {the} Julian Day corresponding to the t value
   * @private
   */
  static julianCentury2JulianDay(t) {
	  const JD = t * 36525.0 + 2451545.0;
	  return JD;
  }

  /**
   * Calculate the Geometric Mean Longitude of the Sun
   * @param {number} t number of Julian centuries since J2000.0
   * @return {the} Geometric Mean Longitude of the Sun in radians
   * @private
   */
  static sunGeometricMeanLongitude(t) {
	  let L0 = 280.46646 + t * (36000.76983 + 0.0003032 * t);
	  while (L0 > 360.0)
		  L0 -= 360.0;
	  while (L0 < 0.0)
		  L0 += 360.0;
	  return Sun.degToRad(L0);
  }

  /**
   * Calculate the Geometric Mean Anomaly of the Sun
   * @param {number} t number of Julian centuries since J2000.0
   * @return {number} the Geometric Mean Anomaly of the Sun in radians
   * @private
   */
  static sunGeometricMeanAnomaly(t) {
	  const M = 357.52911 + t * (35999.05029 - 0.0001537 * t);
	  return Sun.degToRad(M);
  }

  /**
   * Calculate the eccentricity of earth's orbit	
   * @param {number} t number of Julian centuries since J2000.0
   * @return {number} the unitless eccentricity
   * @private
   */
  static earthOrbitalEccentricity(t) {
	  const e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
	  return e;		// unitless
  }

  /**
   * Calculate the equation of center for the sun	
   * @param {number} t number of Julian centuries since J2000.0
   * @return {number} in degrees
   * @private
   */
  static sunEquationOfCentre(t) {
	  const m = Sun.sunGeometricMeanAnomaly(t);
	  const sinm = Math.sin(m);
	  const sin2m = Math.sin(m + m);
	  const sin3m = Math.sin(m + m + m);

	  const C = sinm * (1.914602 - t * (0.004817 + 0.000014 * t))
          + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
	  return C;		// in degrees
  }

  /**
   * Calculate the true longitude of the sun		
   * @param {number} t number of Julian centuries since J2000.0
   * @return {sun}'s true longitude in degrees
   * @private
   */
  static sunTrueLongitude(t) {
	  const l0 = Sun.radToDeg(Sun.sunGeometricMeanLongitude(t));
	  const c = Sun.sunEquationOfCentre(t);

	  const O = l0 + c;
	  return O;		// in degrees
  }

  /**
   * Calculate the apparent longitude of the sun	
   * @param {number} t number of Julian centuries since J2000.0
   * @return {sun}'s apparent longitude in degrees
   * @private
   */
  static sunApparentLongitude(t) {
	  const o = Sun.sunTrueLongitude(t);

	  const omega = Sun.degToRad(125.04 - 1934.136 * t);
	  const lambda = o - 0.00569 - 0.00478 * Math.sin(omega);
	  return lambda;		// in degrees
  }

  /**
   * Calculate the mean obliquity of the ecliptic	
   * @param {number} t number of Julian centuries since J2000.0
   * @return {mean} obliquity in degrees
   * @private
   */
  static meanObliquityOfEcliptic(t) {
	  const seconds = 21.448 - t * (46.8150 + t * (0.00059 - t * 0.001813));
	  const e0 = 23.0 + (26.0 + (seconds / 60.0)) / 60.0;
	  return e0;		// in degrees
  }

  /**
   * Calculate the corrected obliquity of the ecliptic
   * @param {number} t number of Julian centuries since J2000.0
   * @return {number} corrected obliquity in radians
   * @private
   */
  static obliquityCorrection(t) {
	  const e0 = Sun.meanObliquityOfEcliptic(t);
	  const omega = Sun.degToRad(125.04 - 1934.136 * t);
	  const e = e0 + 0.00256 * Math.cos(omega);
	  return Sun.degToRad(e);
  }

  /**
   * Calculate the declination of the sun		
   * @param {number} t number of Julian centuries since J2000.0
   * @return {sun}'s declination in radians
   * @private
   */
  static sunDeclination(t) {
	  const e = Sun.obliquityCorrection(t);
	  const lambda = Sun.sunApparentLongitude(t);

	  const sint = Math.sin(e) * Math.sin(Sun.degToRad(lambda));
	  return Math.asin(sint);
  }

  /**
   * Calculate the difference between true solar time and mean
   * solar time
   * @param {number} t number of Julian centuries since J2000.0
   * @return {equation} of time in minutes of time
   * @private
   */
  static sunEquationOfTime(t) {
	  const epsilon = Sun.obliquityCorrection(t);
	  const l0 = Sun.sunGeometricMeanLongitude(t);
	  const e = Sun.earthOrbitalEccentricity(t);
	  const m = Sun.sunGeometricMeanAnomaly(t);

	  const y = Math.pow(Math.tan(epsilon / 2.0), 2);

	  const sin2l0 = Math.sin(2.0 * l0);
	  const sinm   = Math.sin(m);
	  const cos2l0 = Math.cos(2.0 * l0);
	  const sin4l0 = Math.sin(4.0 * l0);
	  const sin2m  = Math.sin(2.0 * m);

	  const Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0
			    - 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;

	  return Sun.radToDeg(Etime) * 4.0;	// in minutes of time
  }

  /**
   * Calculate the hour angle of the sun at sunrise for the
   * latitude. Negate the result for the hour angle at sunset.
   * @param {number} solarDec declination angle of sun in radians
   * @return {hour} angle of sunrise in radians
   * @private
   */
  hourAngleAtSunrise(solarDec) {
	  const latRad = Sun.degToRad(this.latitude);

	  const HA = (
      Math.acos(
        Math.cos(Sun.degToRad(90.833))
        / (Math.cos(latRad) * Math.cos(solarDec))
        - Math.tan(latRad) * Math.tan(solarDec)));

	  return HA;		// in radians
  }

  /**
   * Calculate the time of solar noon for the given day at the given
   * location on earth
   * @param {number} t number of Julian centuries since J2000.0
   * @return {time} in minutes from midnight UTC
   * @private
   */
  solarNoon(t) {
	  // First pass uses approximate solar noon to calculate eqtime
	  const tnoon = Sun.julianDay2JulianCentury(
      Sun.julianCentury2JulianDay(t) - this.longitude / 360.0);
	  let eqTime = Sun.sunEquationOfTime(tnoon);
	  let solNoonUTC = 720 - (this.longitude * 4) - eqTime; // min

	  const newt = Sun.julianDay2JulianCentury(
      Sun.julianCentury2JulianDay(t) - 0.5 + solNoonUTC / 1440.0); 

	  eqTime = Sun.sunEquationOfTime(newt);
	  // const solarNoonDec = Sun.sunDeclination(newt);
	  solNoonUTC = 720 - (this.longitude * 4) - eqTime; // min
	  
	  return solNoonUTC;
  }

  /**
   * Calculate the time of sunrise/sunset for the given day at the given
   * location on earth
   * @param {Date} date the date
   * @param {boolean} set false for sunrise, true for sunset
   * @return {Date} sunrise
   * @private
   */
  sun(date, set = false) {
    const JD = Sun.julianDayFromDate(date);
	  const t = Sun.julianDay2JulianCentury(JD);
    const riseOrSet = set ? -1 : 1;

	  // Find the time of solar noon at the location, and use
    // that declination.
	  const noonmin = this.solarNoon(t);
	  const tnoon = Sun.julianDay2JulianCentury (JD + noonmin / 1440.0);

	  // *** First pass to approximate sunrise (using solar noon)

	  let eqTime = Sun.sunEquationOfTime(tnoon);
	  let hourAngle = riseOrSet * this.hourAngleAtSunrise(Sun.sunDeclination(tnoon));

	  let delta = -this.longitude - Sun.radToDeg(hourAngle);
	  let timeDiff = 4 * delta;	// in minutes of time
	  let timeUTC = 720 + timeDiff - eqTime;	// in minutes

	  // Second pass includes fractional jday in gamma calc
	  const newt = Sun.julianDay2JulianCentury(
      Sun.julianCentury2JulianDay(t) + timeUTC / 1440.0); 
	  eqTime = Sun.sunEquationOfTime(newt);
	  hourAngle = riseOrSet * this.hourAngleAtSunrise(Sun.sunDeclination(newt));

	  delta = -this.longitude - Sun.radToDeg(hourAngle);
	  timeDiff = 4 * delta;
	  timeUTC = 720 + timeDiff - eqTime; // in minutes

    return new Date(
      date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      Math.floor(timeUTC / 60),
      timeUTC % 60);
  }

  /**
   * Calculate the time of sunset for the given day.
   * @param {Date} date the date
   * @return {Date} sunrise
   */
  set(date) {
    return this.sun(date, true);
  }

  /**
   * Calculate the time of sunrise for the given day.
   * @param {Date} date the date
   * @return {Date} sunrise
   */
  rise(date) {
    return this.sun(date, false);
  }

  /**
   * @param {Date} date the date
   * @return {string} "Sunrise 
   */
  atDate(date) {
    const r = this.rise(date), s = this.set(date);
    const rz = r.toISOString().replace(/^.*?T(\d\d:\d\d)[:\d.]*(.*)$/, "$1$2"),
          sz = s.toISOString().replace(/^.*?T(\d\d:\d\d)[:\d.]*(.*)$/, "$1$2");
    return `Sunrise ${rz} Sunset ${sz}`;
  }
};
