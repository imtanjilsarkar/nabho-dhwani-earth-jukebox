<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1e3c72,100:2a5298&height=220&section=header&text=NabhoDhwani&fontSize=48&fontColor=ffffff&animation=fadeIn&desc=The%20Earth%20Information%20Jukebox&descAlignY=62&descSize=20&fontAlignY=35" width="100%"/>

<img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=20&pause=1000&color=2E9EF7&center=true&vCenter=true&width=600&lines=Turning+Earth+Data+Into+Sound;NASA+Space+Apps+Challenge+2026;Built+by+Team+NabhoDhawni" alt="Typing SVG" />

</div>

# NabhoDhwani — The Earth Information Jukebox

**NASA Space Apps Challenge 2026 — Challenge: The Earth Information Jukebox**

> *"NabhoDhwani"* — See the Change.Hear the Earth. We translate NASA's Earth Information Center (EIC) visualizations into real-time sound, so Earth's changing story can be heard, not just seen.

---

## The Problem

NASA's Earth Information Center produces some of the most compelling visual evidence of our planet's changing climate — glaciers retreating, hurricanes intensifying, forests disappearing. But that evidence lives entirely in the visual channel.

That leaves out:
- **Blind and low-vision audiences**, for whom a satellite animation is simply inaccessible.
- **Anyone without a strong screen or fast connection** to load and interpret dense visual data.
- **Patterns that are genuinely easier to notice by ear** — subtle rhythms, spikes, and trends in a data series that a static image can flatten out.

Earth science communication has one channel. We're building a second one.

## Our Approach

**NabhoDhwani** is an interface that pairs EIC visual frames with dynamically generated sonifications — turning pixel data, intensity, and change-over-time into pitch, rhythm, and timbre in real time.

Instead of just looking at a hurricane strengthen on screen, you hear it strengthen. Instead of scanning a chart of Arctic ice extent, you hear the decade tighten into a shorter, more urgent phrase.

### How it works
1. **Input** — an EIC visualization frame or its underlying dataset.
2. **Mapping** — key visual/data parameters (intensity, color value, magnitude of change) are mapped to sound parameters (pitch, tempo, timbre, volume).
3. **Sonification** — the mapped parameters are rendered as audio in real time, synced to the visual frame.
4. **Playback** — the user experiences the visualization and its sonification together, through the Jukebox interface.

## Features

-  Real-time sonification of EIC visual frames
-  Supports multiple Earth phenomena (extend this list as you implement — hurricanes, ice melt, deforestation, sea level, etc.)
-  Built with accessibility as a first-class goal, not an afterthought
-  Add: interactive playback controls, comparison mode, exportable audio clips, etc. — whatever you actually ship

## Tech Stack

<div align="center">

<!-- Replace/remove badges below to match what you actually use -->
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Web%20Audio%20API-000000?style=for-the-badge&logo=webaudioapi&logoColor=white"/>

</div>

| Layer | Technology |
|---|---|
| Data / Visualization source | NASA EIC (visualizations / datasets) |
| Sonification engine | e.g. Web Audio API / Tone.js / custom Python DSP |
| Frontend | e.g. React / vanilla JS |
| Backend / Processing | e.g. Python / Node.js |
| Deployment | e.g. Vercel / GitHub Pages |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/imtanjilsarkar/nabho-dhwani-earth-jukebox.git
cd nabho-dhwani-earth-jukebox

# Install dependencies
ADD: npm install / pip install -r requirements.txt / etc.

# Run locally
ADD: npm run dev / python app.py / etc.
```

## Demo

Link to demo video / live deployment — add once available

## Team NabhoDhawni

Built for NASA Space Apps Challenge 2026 by:

| Name | Role |
|---|---|
| Tanjil Sarkar | Team Lead |
| Md. Mohiul Alam | Contributor |
| Tanjil Hasan Emon | Contributor |
| Abdullah Al Hossain | Contributor |
| Srobona Nubah Sabir | Contributor |

## Roadmap

- [ ] Core sonification engine for a single Earth phenomenon
- [ ] Real-time frame-to-sound pipeline
- [ ] Interactive Jukebox UI
- [ ] Accessibility testing with screen readers / assistive tech
- [ ] Support for additional EIC datasets
- [ ] Public deployment

## Challenge Context

This project was built for the **NASA Space Apps Challenge 2026**, addressing the *"Earth Information Jukebox"* challenge: building an interface, script, or application that pairs Earth Information Center (EIC) visual frames with dynamic sonifications generated in real time.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- NASA Earth Information Center, for the visualizations and data that make this project possible.
- NASA Space Apps Challenge, for the platform and challenge.

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2a5298,100:1e3c72&height=120&section=footer" width="100%"/>

</div>

