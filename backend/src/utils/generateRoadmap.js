function generateRoadmap(role, skills = []) {
  const has = (skill) => skills.includes(skill.toLowerCase());

  let roadmap = [];

  // ---- FULLSTACK ROADMAP ----
  if (role === "Fullstack Developer") {
    roadmap.push("Week 1: Strengthen React fundamentals (hooks, context)");
    roadmap.push("Week 2: Learn Node.js + Express deeply");

    if (!has("mongodb")) {
      roadmap.push("Week 3: Learn MongoDB CRUD, indexes, aggregation");
    } else {
      roadmap.push("Week 3: Build a fullstack project using MERN");
    }

    if (!has("docker")) {
      roadmap.push("Week 4: Learn Docker basics and containerizing apps");
    }

    roadmap.push("Week 5: Study system design basics for fullstack interviews");
  }

  // ---- BACKEND ENGINEER ----
  if (role === "Backend Developer") {
    roadmap.push("Week 1: Deepen Node.js concepts (async, streams)");
    roadmap.push("Week 2: Master Express.js and middleware patterns");

    if (!has("sql")) {
      roadmap.push("Week 3: Learn SQL + Database indexing");
    }

    roadmap.push("Week 4: Learn Microservices basics");
    roadmap.push("Week 5: Study caching (Redis) + queues (RabbitMQ)");
  }

  // ---- MACHINE LEARNING ENGINEER ----
  if (role === "Machine Learning Engineer") {
    roadmap.push("Week 1: Strengthen Python + NumPy/Pandas");
    roadmap.push("Week 2: Learn ML basics (regression, classification)");

    if (!has("tensorflow") && !has("pytorch")) {
      roadmap.push("Week 3: Learn TensorFlow or PyTorch");
    }

    roadmap.push("Week 4: Build an ML project end-to-end");
  }

  // ---- DEVOPS ----
  if (role === "DevOps Engineer") {
    roadmap.push("Week 1: Learn Linux essentials");
    roadmap.push("Week 2: Understand Docker deeply");

    if (!has("kubernetes")) {
      roadmap.push("Week 3: Learn Kubernetes basics");
    }

    roadmap.push("Week 4: Learn CI/CD (GitHub Actions, Jenkins)");
  }

  // Default roadmap
  if (roadmap.length === 0) {
    roadmap.push("Week 1: Improve problem solving + DSA basics");
    roadmap.push("Week 2: Learn one backend framework");
    roadmap.push("Week 3: Learn one frontend framework");
    roadmap.push("Week 4: Build a simple fullstack project");
  }

  return roadmap;
}

module.exports = generateRoadmap;
