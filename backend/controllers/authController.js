exports.register = (req, res) => {
    const { name, email, password, type } = req.body;

    if (!name || !email || !password || !type) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    User.findByEmail(email, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: ' + err.message });
        }
    
        if (!results || results.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        User.register(name, email, password, type, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error: ' + err.message });
            }
            res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: ' + err.message });
        }

        if (!results || results.length === 0 || results[0].password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const accessToken = generateAccessToken();
        const customerId = results[0].id;
        const userType = results[0].type; 

        User.updateAccessToken(customerId, accessToken, () => {
            res.json({
                message: 'Login successful',
                accessToken,
                customer_id: customerId,
                user_type: userType 
            });
        });
    });
};

exports.logout = (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    User.clearAccessToken(userId, (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to log out" });
        }
        res.json({ message: "Logout successful" });
    });
};
