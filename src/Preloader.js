import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans.js";

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));

        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    }

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                        .classList.add("hidden");
                },
            });
            if (this.device === "desktop") {
                this.timeline
                    .to(this.roomChildren.cube.scale, {
                        x: 1.4,
                        y: 1.4,
                        z: 1.4,
                        ease: "back.out(2.5)",
                        duration: 0.7,
                    })
                    .to(this.room.position, {
                        x: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    });
            } else {
                this.timeline
                    .to(this.roomChildren.cube.scale, {
                        x: 1.4,
                        y: 1.4,
                        z: 1.4,
                        ease: "back.out(2.5)",
                        duration: 0.7,
                    })
                    .to(this.room.position, {
                        z: -1,
                        ease: "power1.out",
                        duration: 0.7,
                    });
            }
            this.timeline
                .to(".intro-text .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                })
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 1,
                    },
                    "same"
                )
                .to(
                    ".toggle-bar",
                    {
                        opacity: 1,
                        onComplete: resolve,
                    },
                    "same"
                );
        });
    }

    secondIntro() {
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline
                .to(
                    ".intro-text .animatedis",
                    {
                        yPercent: 100,
                        stagger: 0.05,
                        ease: "back.in(1.7)",
                    },
                    "fadeout"
                )
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 0,
                    },
                    "fadeout"
                )
                .to(
                    this.room.position,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        ease: "power1.out",
                    },
                    "same"
                )
                .to(
                    this.camera.orthographicCamera.position,
                    {
                        y: 6.5,
                    },
                    "same"
                )
                // .to(
                //     this.roomChildren.cube.position,
                //     {
                //         x: 0.638711,
                //         y: 8.5618,
                //         z: 1.3243,
                //     },
                //     "same"
                // )
                // .set(this.roomChildren.body.scale, {
                //     x: 1,
                //     y: 1,
                //     z: 1,
                // })
                .to(
                    this.roomChildren.cube.scale,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 1,
                    },
                    "introtext"
                )
                // .to(
                //     ".hero-main-title .animatedis",
                //     {
                //         yPercent: 0,
                //         stagger: 0.07,
                //         ease: "back.out(1.7)",
                //     },
                //     "introtext"
                // )
                // .to(
                //     ".hero-main-description .animatedis",
                //     {
                //         yPercent: 0,
                //         stagger: 0.07,
                //         ease: "back.out(1.7)",
                //     },
                //     "introtext"
                // )
                // .to(
                //     ".first-sub .animatedis",
                //     {
                //         yPercent: 0,
                //         stagger: 0.07,
                //         ease: "back.out(1.7)",
                //     },
                //     "introtext"
                // )
                // .to(
                //     ".second-sub .animatedis",
                //     {
                //         yPercent: 0,
                //         stagger: 0.07,
                //         ease: "back.out(1.7)",
                //     },
                //     "introtext"
                // )
               
                // .to(
                //     this.roomChildren.clock.scale,
                //     {
                //         x: 1,
                //         y: 1,
                //         z: 1,
                //         ease: "back.out(2.2)",
                //         duration: 0.5,
                //     },
                //     ">-0.4"
                // )
                .to(
                    this.roomChildren.akai_lp.scale,
                    {
                        x: 0.02,
                        y: 0.02,
                        z: 0.02,
                    },
                    "same"
                )
                .to(
                    this.roomChildren.akai_lp.position,
                    {
                        x: -5.638711,
                        y: 6.5618,
                        z: 1.3243,
                    },
                    "same"
                )
                .to(
                    this.roomChildren.table001.scale,
                    {
                        x: 15,
                        y: 15,
                        z: 35,
                    },
                    "same"
                )
                .to(
                    this.roomChildren.table001.position,
                    {
                        x: 0.638711,
                        y: -5.5618,
                        z: 1.3243,
                    },
                    "same"
                )
                .to(//monitor
                    this.roomChildren.plane001.scale,
                    {
                        x: 8,
                        y: 8,
                        z: 5,
                    },
                    "same"
                    )
                    .to(
                        this.roomChildren.plane001.position,
                        {
                            x: 0.638711,
                            y: 14,
                            z: 1.3243,
                        },
                        "same"
                    )
                .to(this.roomChildren.macmini_1_0.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                },
                "same"
                )
                .to(
                    this.roomChildren.macmini_1_0.position,
                    {
                        x: 7.638711,
                        y: 6.5618,
                        z: 0.3243,
                    },
                    "same"
                )
                .to(this.roomChildren.krkspeakerl_rubber_0001.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                },
                "same"
                )
                .to(
                    this.roomChildren.krkspeakerl_rubber_0001.position,
                    {
                        x: -10.638711,
                        y: 6.5618,
                        z: 0.3243,
                    },
                    "same"
                )
                .to(this.roomChildren.krkspeakerl_rubber_0001.rotation, {
                    z: 45,
                },
                "same"
                )
                .to(this.roomChildren.krkspeakerl_rubber_0002.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                },
                "same"
                )
                .to(
                    this.roomChildren.krkspeakerl_rubber_0002.position,
                    {
                        x: 10.638711,
                        y: 6.5618,
                        z: 0.3243,
                    },
                    "same"
                )
                .to(this.roomChildren.krkspeakerl_rubber_0002.rotation, {
                    z: -90,
                },
                "same"
                )
                .to(".arrow-svg-wrapper", {
                    opacity: 1,
                    onComplete: resolve,
                });
        });
    }

    onScroll(e) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initalY - currentY;
        if (difference > 0) {
            console.log("swipped up");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.intialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }
    async playSecondIntro() {
        this.moveFlag = false;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-1, 0, 0);
        } else {
            this.room.position.set(0, 0, -1);
        }
    }

    scale() {
        this.roomChildren.rectLight.width = 0;
        this.roomChildren.rectLight.height = 0;

        if (this.device === "desktop") {
            this.room.scale.set(0.11, 0.11, 0.11);
        } else {
            this.room.scale.set(0.07, 0.07, 0.07);
        }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        if (this.scaleFlag) {
            this.scale();
        }
    }
}