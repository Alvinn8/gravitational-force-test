const G = 6.67 * 10**-11;
const DISTANCE_MOON_EARTH = 3.844 * 10**8;
const EARTH_MASS = 5.9736 * 10**24;
const MOON_MASS = 7.349 * 10**22;

let spaceshipMass = 1000;
let distance = 1;

function newtonsGravitationalFormula(m1, m2, r) {
    return G * ((m1 * m2)/(r * r));
}

function formatNumber(value, unit) {
    if (value > 10**9) {
        return (value / 10 ** 9).toFixed(2) + " G" + unit;
    }
    if (value > 10**6) {
        return (value / 10 ** 6).toFixed(2) + " M" + unit;
    }
    if (value > 1000) {
        return (value / 1000).toFixed(2) + " k" + unit;
    }
    return value.toFixed(2) + " " + unit;
}

function render() {
    const $container = $("#display");
    const $earth = $("#earth");
    const $spaceship = $("#spaceship");
    const $moon = $("#moon");

    $earth.css("left", 0);
    $moon.css("left", $container.width() - $moon.width());
    $spaceship.css("left", (distance / DISTANCE_MOON_EARTH) * ($container.width() - $spaceship.width() - $moon.width() - $earth.width()) + $earth.width());

    const earthForce = newtonsGravitationalFormula(EARTH_MASS, spaceshipMass, distance);
    const moonForce = newtonsGravitationalFormula(MOON_MASS, spaceshipMass, DISTANCE_MOON_EARTH - distance);

    $("#force-earth").text(formatNumber(earthForce, "N"));
    $("#force-moon").text(formatNumber(moonForce, "N"));
}

$(function() {
    distance = DISTANCE_MOON_EARTH / 2;
    $("#distance-slider")
        .attr("max", DISTANCE_MOON_EARTH - 1)
        .attr("value", distance);
        
    $("#distance").attr("value", distance);

    render();

    $("#distance-slider").on("input", function() {
        distance = this.value;
        $("#distance").get(0).value = this.value;
        render();
    });

    $("#distance").on("input", function() {
        distance = this.value;
        $("#distance-slider").get(0).value = this.value;
        render();
    });
});

$(window).on("resize", render);